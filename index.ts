import express from "express";
import { connectDB } from "./src/config/database";
import { syncModels } from "./src/models";
import { coursesRouter } from "./src/routes/courses";
import { chatRouter } from "./src/routes/chat";

const app = express();
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", coursesRouter);
app.use("/api", chatRouter);

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
