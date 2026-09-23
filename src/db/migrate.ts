import fs from "node:fs";
import path from "node:path";
import { Sequelize } from "sequelize";
import sequelize from "../config/database";

/**
 * Minimal, dependency-free migration runner — replaces `sequelize-cli`.
 *
 * sequelize-cli (and the `umzug` package it and every version of `umzug`
 * itself depend on) unconditionally `require()`s `@rushstack/ts-command-line`
 * at load time, and that package hangs indefinitely in this shell — no
 * error, no timeout, just a process that never proceeds past `require()`.
 * That's true even importing `umzug`'s internal submodules directly to
 * dodge its own CLI wrapper: `umzug/lib/umzug.js` itself has
 * `require("./cli")` at the top, so there's no way to use the library
 * without pulling in the broken dependency. (Likely cause: something in
 * that package's own module-load side effects — e.g. probing the terminal
 * — that a real TTY answers instantly but this shell never does.)
 *
 * This script re-implements exactly what this project's four `migrate:*`
 * scripts need against Sequelize's own `queryInterface`, nothing more:
 * find pending `.cjs` files in this directory, run their `up`, track
 * applied names in a `SequelizeMeta` table with the same shape
 * sequelize-cli used (so rows inserted by hand during the old hang
 * workaround are still valid), in filename (timestamp) order.
 */

const MIGRATIONS_DIR = path.resolve(import.meta.dir, "migrations");
const META_TABLE = "SequelizeMeta";

interface MigrationModule {
  up: (queryInterface: ReturnType<typeof sequelize.getQueryInterface>, Seq: typeof Sequelize) => Promise<void>;
  down?: (queryInterface: ReturnType<typeof sequelize.getQueryInterface>, Seq: typeof Sequelize) => Promise<void>;
}

function migrationFiles(): string[] {
  return fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".cjs"))
    .sort();
}

async function ensureMetaTable(): Promise<void> {
  await sequelize.query(
    `CREATE TABLE IF NOT EXISTS "${META_TABLE}" (name VARCHAR(255) NOT NULL UNIQUE PRIMARY KEY)`
  );
}

async function appliedNames(): Promise<Set<string>> {
  const [rows] = await sequelize.query(`SELECT name FROM "${META_TABLE}" ORDER BY name ASC`);
  return new Set((rows as { name: string }[]).map((r) => r.name));
}

function loadMigration(name: string): MigrationModule {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(path.join(MIGRATIONS_DIR, name)) as MigrationModule;
}

async function up(): Promise<void> {
  await ensureMetaTable();
  const applied = await appliedNames();
  const pending = migrationFiles().filter((f) => !applied.has(f));

  if (pending.length === 0) {
    console.log("[migrate] No pending migrations.");
    return;
  }

  const queryInterface = sequelize.getQueryInterface();
  for (const name of pending) {
    console.log(`[migrate] Applying ${name}...`);
    await loadMigration(name).up(queryInterface, Sequelize);
    await sequelize.query(`INSERT INTO "${META_TABLE}" (name) VALUES (:name)`, { replacements: { name } });
    console.log(`[migrate] Applied ${name}.`);
  }
}

async function down(): Promise<void> {
  await ensureMetaTable();
  const applied = Array.from(await appliedNames()).sort();
  const last = applied.at(-1);

  if (!last) {
    console.log("[migrate] No migrations to revert.");
    return;
  }

  const migration = loadMigration(last);
  if (!migration.down) {
    console.error(`[migrate] ${last} has no down() — refusing to revert.`);
    process.exit(1);
  }

  console.log(`[migrate] Reverting ${last}...`);
  await migration.down(sequelize.getQueryInterface(), Sequelize);
  await sequelize.query(`DELETE FROM "${META_TABLE}" WHERE name = :name`, { replacements: { name: last } });
  console.log(`[migrate] Reverted ${last}.`);
}

async function status(): Promise<void> {
  await ensureMetaTable();
  const applied = await appliedNames();
  for (const name of migrationFiles()) {
    console.log(`  [${applied.has(name) ? "x" : " "}] ${name}`);
  }
}

const TEMPLATE = `'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {},

  async down(queryInterface, Sequelize) {},
};
`;

function generate(rawName: string): void {
  if (!rawName.trim()) {
    console.error("Usage: bun run migrate:generate -- <name>");
    process.exit(1);
  }
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:TZ]/g, "")
    .replace(/\.\d+$/, "")
    .slice(0, 14);
  const slug = rawName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const filename = `${timestamp}-${slug}.cjs`;
  const filepath = path.join(MIGRATIONS_DIR, filename);
  fs.writeFileSync(filepath, TEMPLATE);
  console.log(`[migrate] Created ${path.relative(process.cwd(), filepath)}`);
}

async function main(): Promise<void> {
  const [, , command, ...rest] = process.argv;

  switch (command) {
    case "up":
      await up();
      break;
    case "down":
      await down();
      break;
    case "status":
      await status();
      break;
    case "generate":
      generate(rest.join(" "));
      return; // no DB connection needed
    default:
      console.error(`Unknown command: ${command}. Expected one of: up, down, status, generate.`);
      process.exit(1);
  }

  await sequelize.close();
}

main().catch((err) => {
  console.error("[migrate] Failed:", err);
  process.exit(1);
});
