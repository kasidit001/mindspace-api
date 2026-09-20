import { Sequelize } from "sequelize";

const { DATABASE_URL, DB_SSL } = process.env;

interface DbConnection {
  database: string;
  username: string;
  password: string;
  host: string;
  port: number;
}

// Managed Postgres hosts (Neon, Render, Supabase) hand out a single DATABASE_URL
// rather than separate vars. Parsed by hand instead of passed to Sequelize as a
// URI, because Sequelize forwards URL query params like `sslmode=require` as
// unrecognized options that pg ignores — TLS would silently stay off.
function fromUrl(rawUrl: string): DbConnection {
  const url = new URL(rawUrl);
  return {
    database: url.pathname.replace(/^\//, ""),
    username: decodeURIComponent(url.username),
    password: decodeURIComponent(url.password),
    host: url.hostname,
    port: Number(url.port || 5432),
  };
}

const connection: DbConnection = DATABASE_URL
  ? fromUrl(DATABASE_URL)
  : {
      database: process.env.DB_NAME ?? "mindspace",
      username: process.env.DB_USER ?? "mindspace",
      password: process.env.DB_PASSWORD ?? "mindspace",
      host: process.env.DB_HOST ?? "localhost",
      port: Number(process.env.DB_PORT ?? "5434"),
    };

// TLS is on by default when connecting via DATABASE_URL (remote managed DB), off
// for the local docker-compose Postgres, and either can be forced with DB_SSL.
const useSsl = DB_SSL ? DB_SSL === "true" : Boolean(DATABASE_URL);

export const sequelize = new Sequelize(connection.database, connection.username, connection.password, {
  host: connection.host,
  port: connection.port,
  dialect: "postgres",
  logging: false,
  dialectOptions: useSsl ? { ssl: { require: true } } : {},
});

/**
 * Verifies the DB connection and ensures the pgvector extension is enabled.
 * Must run before any model that uses a VECTOR column is synced/queried.
 */
export async function connectDB(): Promise<void> {
  await sequelize.authenticate();
  console.log("[db] Connection established.");

  await sequelize.query("CREATE EXTENSION IF NOT EXISTS vector;");
  console.log("[db] pgvector extension enabled.");
}

export default sequelize;
