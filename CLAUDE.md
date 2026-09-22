# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
docker compose up -d        # start Postgres+pgvector (localhost:5434) — required before anything below
bun install                 # install deps
bun run dev                 # start API with hot reload (bun --watch index.ts), http://localhost:8080
bun run seed                 # seed courses/lessons from src/scripts/seedContent.ts, and embed them
                              # (embedding step needs OPENAI_API_KEY; skipped with a warning if unset)
bun run migrate               # apply pending migrations (src/db/migrations, via src/db/migrate.ts —
                                # not sequelize-cli, see src/db/README.md for why)
bun run migrate:status        # list applied/pending migrations
bun run migrate:undo          # roll back the most recently applied migration
bun run migrate:generate -- <name>   # scaffold a new migration — see src/db/README.md
```

No test suite exists yet (`bun test` is Bun's runner if one is added).

## Architecture

This is a plain Express API (`index.ts`), not `Bun.serve()` — despite the general Bun
guidance further down this file, this codebase already commits to Express + `pg` (via
Sequelize) throughout. Match that, don't reintroduce `Bun.serve()`/`Bun.sql` here.

**Layered flow**: every request goes `Route → Controller → UseCase → Service → Repository →
Model → Database`, strictly in that order — a layer only calls the one directly below it.

- `src/routes/*.ts` — thin. Just `Router()` + wiring a path/method (and `requireAuth` where
  needed) to a controller function. No request parsing, no business logic here.
- `src/controllers/*.controller.ts` — the HTTP boundary. Parses `req.body`/`params`/`query`,
  validates the *shape* of the input (missing/wrong-typed fields -> `BadRequestError`), calls
  exactly one usecase, and shapes the response (`res.json`/status codes/SSE plumbing for
  chat). Business-rule validation (does this resource exist, is this email taken) does NOT
  belong here — that's the usecase's job.
- `src/usecases/<domain>/*.usecase.ts` — orchestration and business rules (e.g. "USER role
  must exist", "email must be unique", "lesson must exist before completing it"). Calls one
  or more services, never a repository or model directly.
- `src/services/*.service.ts` — domain logic and external integrations: `auth.service.ts`
  (password hashing, session tokens — pure crypto, no DB), `embedding.service.ts` (chunking +
  OpenAI embeddings), `chat.service.ts` (retrieval-augmented completion), plus one thin
  service per domain (`course.service.ts`, `note.service.ts`, etc.) that delegates to its
  repository. Calls repositories, never touches Sequelize/raw SQL directly.
- `src/repositories/*.repository.ts` — the only layer that touches Sequelize models or raw
  SQL. One file per aggregate (`user`, `course`, `lesson`, `note`, `progress`,
  `lessonEmbedding`, `search`, `stats`, `tag`). Returns already-camelCased data, hiding
  column-naming/SQL details from everything above it.
- `src/middlewares/auth.middleware.ts` — `requireAuth`/`optionalAuth` sit *between* route and
  controller (Express middleware, not one of the layers above), populating `req.user`.
- `src/interfaces/*.interface.ts` — shared TypeScript contracts, one file per domain
  (`auth`, `user`, `course`, `note`, `progress`, `embedding`, `chat`, `search`, `stats`).
  Not a stop in the chain — every layer above may import from here, but nothing should
  define a request/response/query-input shape inline anymore. When a repository/service/
  usecase needs a new data shape, add it to the matching `*.interface.ts` file rather than
  declaring it locally, so the type has exactly one source of truth other layers can import.

**Data layer**: Postgres + pgvector, accessed through Sequelize (via repositories only).
- Models live in `src/models/*.ts`; `src/models/index.ts` exports them all and its
  `syncModels()` (called once at startup in `index.ts`) is what actually creates/updates
  tables via `sequelize.sync()`. It also runs `ensureVectorColumn()` — raw SQL to add the
  `lesson_embeddings.embedding VECTOR(1536)` column and its HNSW index, because Sequelize 6
  has no native pgvector type — and `ensureRoles()`, which seeds the fixed `roles` rows.
- `src/db/` holds a **separate** migration track (see `src/db/README.md`) for schema changes
  going forward, run via `src/db/migrate.ts` — a small custom runner, not `sequelize-cli`.
  `roles`, `users`, and the `user_id` columns on `user_progress`/`notes` are migration-tracked;
  the original tables (`courses`, `lessons`, `lesson_embeddings`, and the rest of
  `user_progress`/`notes`) still rely solely on `sync()` and have no migration files for their
  base schema.
- Associations: `Course.hasMany(Lesson)`, `Lesson.hasMany(LessonEmbedding)`,
  `Lesson.hasMany(Progress)`, `Lesson.hasMany(Note)` (nullable `lessonId` — a saved chat
  answer may not be tied to one lesson), `Role.hasMany(User)`, `User.hasMany(Progress)`,
  `User.hasMany(Note)`, `Course.belongsToMany(Tag, through: CourseTag)` (curated labels —
  see Tagging below). `Progress` is unique on `(userId, lessonId)`, not `lessonId` alone —
  it used to be global/single-user; see auth below for when that changed. Most models don't
  declare typed association properties (no `NonAttribute<...>` fields) — accessing e.g.
  `user.role` after an `include` works at runtime but isn't typechecked; this is a
  pre-existing gap across most models, except `Course.tags`, which is typed.

**Tagging**: `Tag` (`name`, unique `slug`) and the `CourseTag` join model (`src/models/
Tag.ts`/`CourseTag.ts`) give courses real, curated, queryable labels — distinct from
`~/utils/courseTech.ts`'s frontend-only title-regex tech guess, which exists purely for
display/filtering heuristics and isn't backed by any table. `src/services/tag.service.ts`'s
`findOrCreateByName` is idempotent (safe to call every seed run); `seedContent.ts` doesn't
carry tags itself — they're assigned per course slug in `src/scripts/seed.ts`'s
`COURSE_TAGS` map, so adding a new course means adding its tags there too.
`findAllWithLessons()` includes `tags` on every course in `GET /api/courses` automatically
(no controller/interface changes needed — same pass-through as every other included
association).

**RAG chat flow** (the core feature): `src/services/embedding.service.ts` chunks lesson
content on paragraph boundaries, embeds it via `OpenAIEmbeddings` pointed at OpenRouter, and
(through `src/repositories/lessonEmbedding.repository.ts`) writes rows to `lesson_embeddings`
with raw SQL (`::vector` cast — again, no Sequelize pgvector type). `src/services/chat.service.ts`
embeds the question, does a cosine-distance similarity search (raw SQL, `<=>` operator, via
the same repository's `findSimilarChunks`), then asks `ChatOpenAI` to answer grounded only in
the retrieved chunks, citing lesson titles. Two entry points mirror each other:
`askQuestion()` (single JSON response) and `streamAnswer()` (async generator of token/done
events), each wrapped by a same-named usecase. `src/controllers/chat.controller.ts` exposes
both through one endpoint (`POST /api/chat/ask`, `stream: true` switches to SSE) — note it
listens on `res.on("close")` rather than `req.on("close")` to detect client disconnects
correctly.

**Auth**: `src/services/auth.service.ts` — `Bun.password.hash`/`verify` (argon2id, no bcrypt
dependency) for passwords, and a minimal HMAC-SHA256 signed session token (not a full JWT —
no external JWT library) via `signToken`/`verifyToken`. `SESSION_SECRET` is required at
startup; the process throws immediately if it's unset, rather than signing with a guessable
default. `src/middlewares/auth.middleware.ts`'s `requireAuth`/`optionalAuth` populate
`req.user` (`{ id, name, email, role }`); routes needing an account
(`/api/lessons/:id/complete`, `/api/progress`, `/api/notes`) use `requireAuth` and scope
their queries by `req.user!.id`. `src/usecases/auth/{signup,login}.usecase.ts` hold the
signup/login business rules (always assigns the `USER` role on signup — `SYSTEM_ADMIN` is
granted out of band, directly in the DB, never through this public endpoint; same error for
"no such user" and "wrong password" on login, to avoid an account-enumeration oracle).
`GET /api/auth/me` just echoes `req.user` — no usecase needed for that one.

**Search** is two independent systems, not one: `/api/search`
(`src/repositories/search.repository.ts`) is Postgres full-text search (`to_tsvector`/
`ts_rank`) for the Cmd+K "jump to this lesson" spotlight; the pgvector search above is only
for chat retrieval grounding.

**Errors**: `AppError` and its subclasses (`src/utils/errors.ts`) carry an intended HTTP
status + safe-to-expose message. The catch-all error middleware in `index.ts` must stay
registered last and keep its 4-arg signature (`(err, req, res, next)`) — that arity is what
Express uses to recognize an error handler. Controllers `next(err)` on failure (either an
error thrown by a usecase, or a locally-constructed `BadRequestError` for malformed input);
usecases and services throw rather than touching `res` directly.

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
