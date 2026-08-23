import { Router } from "express";
import { askQuestion } from "../services/chat";

export const chatRouter = Router();

// POST /api/chat/ask  { question: string }
chatRouter.post("/chat/ask", async (req, res) => {
  const { question } = req.body ?? {};

  if (typeof question !== "string" || !question.trim()) {
    res.status(400).json({ error: "Body must include a non-empty 'question' string" });
    return;
  }

  try {
    const result = await askQuestion(question.trim());
    res.json(result);
  } catch (err) {
    console.error("[chat] askQuestion failed:", err);
    res.status(502).json({ error: "Failed to answer question", detail: (err as Error).message });
  }
});
