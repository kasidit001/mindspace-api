// sequelize-cli connection config (CommonJS — the CLI's migration runner uses
// require(), not the app's ESM/bundler pipeline). Mirrors the same env vars
// and defaults as src/config/database.ts so `bunx sequelize-cli db:migrate`
// talks to the same database the app connects to.
const base = {
  username: process.env.DB_USER || "mindspace",
  password: process.env.DB_PASSWORD || "mindspace",
  database: process.env.DB_NAME || "mindspace",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5434),
  dialect: "postgres",
};

module.exports = {
  development: base,
  test: base,
  production: base,
};
