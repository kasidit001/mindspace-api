# Migrations

Schema changes going forward should be captured as `sequelize-cli` migrations
here, instead of relying only on `sequelize.sync()` (`src/models/index.ts`).
`sync()` is still what actually creates/updates tables when the API starts —
migrations exist alongside it as a reviewable, ordered record of schema
changes and the only way to run destructive changes (drop/rename column,
etc.) deliberately.

## Commands

```bash
bun run migrate            # apply pending migrations
bun run migrate:status     # list applied/pending migrations
bun run migrate:undo       # roll back the most recent migration
bun run migrate:generate -- <name>   # scaffold a new migration file
```

## Gotcha: `.js` → `.cjs`

`package.json` has `"type": "module"`, but `sequelize-cli`'s migration
runner loads files with plain `require()`. `migration:generate` always
scaffolds a `.js` file, which Node then refuses to `require()` under an ESM
package. **Rename every generated migration/seeder from `.js` to `.cjs`
before writing it** (see `20260914172404-create-roles.cjs` for the pattern).
`src/db/config/config.cjs` and `.sequelizerc` already use `.cjs` for the
same reason.

## Existing tables predate this setup

`courses`, `lessons`, `lesson_embeddings`, `user_progress`, and `notes` were
created by `sync()` before migrations were introduced and have no migration
files. Leave them to `sync()`; only `roles` (and anything added after
2026-09-14) is migration-tracked. Backfill migrations for the older tables
only if you need to run a real schema change against them.
