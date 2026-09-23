# Migrations

Schema changes going forward should be captured as migrations here, instead
of relying only on `sequelize.sync()` (`src/models/index.ts`). `sync()` is
still what actually creates/updates tables when the API starts — migrations
exist alongside it as a reviewable, ordered record of schema changes and the
only way to run destructive changes (drop/rename column, etc.) deliberately.

## Commands

```bash
bun run migrate            # apply pending migrations
bun run migrate:status     # list applied/pending migrations
bun run migrate:undo       # roll back the most recently applied migration
bun run migrate:generate -- <name>   # scaffold a new migration file
```

These run `src/db/migrate.ts`, a small dependency-free runner written for
this project — **not** `sequelize-cli`. `sequelize-cli` (and every version
of the `umzug` package it, and `umzug` itself, depend on) unconditionally
`require()`s `@rushstack/ts-command-line` at load time, and that hangs
indefinitely in this project's shell environment — no error, no timeout,
just a process that never gets past `require()`. That's true even importing
`umzug`'s internal files directly to dodge its own CLI wrapper, since
`umzug/lib/umzug.js` itself pulls in the same broken dependency. `migrate.ts`
re-implements exactly what this project's four scripts need directly against
Sequelize's `queryInterface` — find pending `.cjs` files here, run their
`up`/`down`, track applied names in a `SequelizeMeta` table (same shape
`sequelize-cli` used, so nothing needed to change in the database).

Each migration file's shape is unchanged from the `sequelize-cli` convention
— `module.exports = { async up(queryInterface, Sequelize) {}, async down(queryInterface, Sequelize) {} }`
— so nothing about writing one is different, only how they're run.

## Gotcha: `.js` → `.cjs`

`package.json` has `"type": "module"`, but migrations are loaded with plain
`require()`, which refuses `.js` files under an ESM package.
`migrate:generate` already scaffolds `.cjs` directly, so this is only a
gotcha if you ever create a migration file by hand instead — keep it `.cjs`
(see `20260914172404-create-roles.cjs` for the pattern).

## Existing tables predate this setup

`courses`, `lessons`, `lesson_embeddings`, `user_progress`, and `notes` were
created by `sync()` before migrations were introduced and have no migration
files. Leave them to `sync()`; only `roles` (and anything added after
2026-09-14) is migration-tracked. Backfill migrations for the older tables
only if you need to run a real schema change against them.
