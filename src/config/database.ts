import { Sequelize } from "sequelize";

const {
  DB_HOST = "localhost",
  DB_PORT = "5434",
  DB_NAME = "mindspace",
  DB_USER = "mindspace",
  DB_PASSWORD = "mindspace",
} = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "postgres",
  logging: false,
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
