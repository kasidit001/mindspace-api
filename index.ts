import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import { connectDB } from "./src/config/database";
import { syncModels } from "./src/models";
import { coursesRouter } from "./src/routes/courses";
import { chatRouter } from "./src/routes/chat";
import { progressRouter } from "./src/routes/progress";
import { notesRouter } from "./src/routes/notes";

// Catch anything that slips past Express's own error handling (e.g. errors thrown
// outside a request, or in a callback that isn't awaited) so the process logs the
// cause instead of dying silently or with an opaque crash.
process.on("uncaughtException", (err) => {
  console.error("[fatal] Uncaught exception:", err);
});

process.on("unhandledRejection", (reason) => {
  console.error("[fatal] Unhandled rejection:", reason);
});

// mindspace-web (Nuxt) runs on a different origin/port than this API, so the browser
// needs CORS headers to allow the cross-origin fetches — without this, requests fail
// silently in the browser (server itself is fine, as curl/server-to-server calls show).
const WEB_ORIGIN = process.env.WEB_ORIGIN ?? "http://localhost:3000";

const app = express();
app.use(cors({ origin: WEB_ORIGIN }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", coursesRouter);
app.use("/api", chatRouter);
app.use("/api", progressRouter);
app.use("/api", notesRouter);

// Error-handling middleware must be registered last, after all routes, and take
// exactly 4 args — that arity is how Express recognizes it as an error handler.
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error("[error]", err);
  if (res.headersSent) return;
  res.status(500).json({ error: "Internal server error" });
};
app.use(errorHandler);

const PORT = Number(process.env.PORT ?? 8080);

async function main() {
  await connectDB();
  await syncModels();
  app.listen(PORT, () => {
    console.log(`[server] Listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("[server] Failed to start:", err);
  process.exit(1);
});
