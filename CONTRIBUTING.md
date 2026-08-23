# Contributing

## Branching model

`develop` is the default/integration branch. `main` is reserved for releases.

Branch off `develop`:

```bash
git checkout -b <type>/<short-description> develop
```

Types: `feature/`, `fix/`, `chore/`, `docs/`, `refactor/`. Example: `feature/course-progress-tracking`.

## Workflow

1. Branch from `develop` (above).
2. Commit, push: `git push -u origin <branch>`.
3. Open a PR targeting `develop`:
   ```bash
   gh pr create --base develop --head <branch>
   ```
4. Address review feedback.
5. Merge (squash preferred) into `develop`. Delete the branch after merge.

## Commit messages

Conventional Commits style: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`. Keep the subject line under ~50 chars; add a body when the "why" isn't obvious from the diff.

## Before opening a PR

- `bun run index.ts` starts without errors (DB running via `docker compose up -d`).
- No secrets committed (`.env` is gitignored — use `.env.example` to document new vars).
