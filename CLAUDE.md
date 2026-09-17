# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
docker compose up -d        # start Postgres+pgvector (localhost:5434) — required before anything below
bun install                 # install deps
bun run dev                 # start API with hot reload (bun --watch index.ts), http://localhost:8080
bun run seed                 # seed courses/lessons from src/scripts/seedContent.ts, and embed them
                              # (embedding step needs OPENAI_API_KEY; skipped with a warning if unset)
bun run migrate               # apply pending sequelize-cli migrations (src/db/migrations)
bun run migrate:status        # list applied/pending migrations
bun run migrate:undo          # roll back the most recent migration
bun run migrate:generate -- <name>   # scaffold a new migration — see src/db/README.md,
                                       # generated .js file must be renamed to .cjs by hand
```

No test suite exists yet (`bun test` is Bun's runner if one is added).

## Architecture

This is a plain Express API (`index.ts`), not `Bun.serve()` — despite the general Bun
guidance further down this file, this codebase already commits to Express + `pg` (via
Sequelize) throughout. Match that, don't reintroduce `Bun.serve()`/`Bun.sql` here.

**Data layer**: Postgres + pgvector, accessed through Sequelize.
- Models live in `src/models/*.ts`; `src/models/index.ts` exports them all and its
  `syncModels()` (called once at startup in `index.ts`) is what actually creates/updates
  tables via `sequelize.sync()`. It also runs `ensureVectorColumn()` — raw SQL to add the
  `lesson_embeddings.embedding VECTOR(1536)` column and its HNSW index, because Sequelize 6
  has no native pgvector type — and `ensureRoles()`, which seeds the fixed `roles` rows.
- `src/db/` holds a **separate** `sequelize-cli` migration track (see `src/db/README.md`)
  for schema changes going forward. `roles`, `users`, and the `user_id` columns on
  `user_progress`/`notes` are migration-tracked; the original tables (`courses`, `lessons`,
  `lesson_embeddings`, and the rest of `user_progress`/`notes`) still rely solely on `sync()`
  and have no migration files for their base schema.
- Associations: `Course.hasMany(Lesson)`, `Lesson.hasMany(LessonEmbedding)`,
  `Lesson.hasMany(Progress)`, `Lesson.hasMany(Note)` (nullable `lessonId` — a saved chat
  answer may not be tied to one lesson), `Role.hasMany(User)`, `User.hasMany(Progress)`,
  `User.hasMany(Note)`. `Progress` is unique on `(userId, lessonId)`, not `lessonId` alone —
  it used to be global/single-user; see auth below for when that changed.

**RAG chat flow** (the core feature): `src/services/embeddings.ts` chunks lesson content
on paragraph boundaries, embeds it via `OpenAIEmbeddings` pointed at OpenRouter, and writes
rows to `lesson_embeddings` with raw SQL (`::vector` cast — again, no Sequelize pgvector
type). `src/services/chat.ts` embeds the question, does a cosine-distance similarity search
(raw SQL, `<=>` operator) via `searchSimilarChunks`, then asks `ChatOpenAI` to answer
grounded only in the retrieved chunks, citing lesson titles. Two entry points mirror each
other: `askQuestion()` (single JSON response) and `streamAnswer()` (async generator of
token/done events). `src/routes/chat.ts` exposes both through one endpoint
(`POST /api/chat/ask`, `stream: true` switches to SSE) — note it listens on `res.on("close")`
rather than `req.on("close")` to detect client disconnects correctly.

**Auth**: `src/utils/auth.ts` — `Bun.password.hash`/`verify` (argon2id, no bcrypt dependency)
for passwords, and a minimal HMAC-SHA256 signed session token (not a full JWT — no external
JWT library) via `signToken`/`verifyToken`. `SESSION_SECRET` is required at startup; the
process throws immediately if it's unset, rather than signing with a guessable default.
`requireAuth`/`optionalAuth` Express middleware populate `req.user` (`{ id, name, email,
role }`); routes needing an account (`/api/lessons/:id/complete`, `/api/progress`,
`/api/notes`) use `requireAuth` and scope their queries by `req.user!.id`. `src/routes/auth.ts`
exposes `POST /api/auth/signup` (always assigns the `USER` role — `SYSTEM_ADMIN` is granted
out of band, directly in the DB, never through this endpoint), `POST /api/auth/login`, and
`GET /api/auth/me`.

**Search** is two independent systems, not one: `/api/search` is Postgres full-text search
(`to_tsvector`/`ts_rank`) for the Cmd+K "jump to this lesson" spotlight; the pgvector search
above is only for chat retrieval grounding.

**Errors**: `AppError` and its subclasses (`src/utils/errors.ts`) carry an intended HTTP
status + safe-to-expose message. The catch-all error middleware in `index.ts` must stay
registered last and keep its 4-arg signature (`(err, req, res, next)`) — that arity is what
Express uses to recognize an error handler. Some routes (`notes.ts`, `progress.ts`,
`search.ts`) still write `res.status(...).json(...)` directly for validation errors instead
of throwing/`next()`-ing an `AppError` — match whichever pattern the file you're editing
already uses.

**Config**: `src/config/constants.ts` centralizes the OpenRouter base URL and model names
(embedding + chat) both `src/services/*` use; `OPENAI_API_KEY` is the env var name despite
routing through OpenRouter, and `WEB_ORIGIN` (default `http://localhost:3000`) is the only
origin CORS allows, matching the sibling `mindspace-web` (Nuxt) frontend that's the actual
consumer of this API.

## Git workflow

See `CONTRIBUTING.md` for the full flow. Short version: branch off `develop`
(`<type>/<short-description>`, e.g. `feature/course-progress-tracking`), PR into `develop`
(`main` is releases only), Conventional Commits, squash-merge.

## Bun

Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Use `bunx <package> <command>` instead of `npx <package> <command>`
- Bun automatically loads `.env`, so don't use `dotenv`.

For more information, read the Bun API docs in `node_modules/bun-types/docs/**.mdx`.
