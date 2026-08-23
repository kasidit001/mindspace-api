import { Router } from "express";
import { askQuestion } from "../services/chat";
import { BadGatewayError, BadRequestError } from "../utils/errors";

export const chatRouter = Router();

// POST /api/chat/ask  { question: string }
chatRouter.post("/chat/ask", async (req, res, next) => {
  const { question } = req.body ?? {};

  if (typeof question !== "string" || !question.trim()) {
    next(new BadRequestError("Body must include a non-empty 'question' string"));
    return;
  }

  try {
    const result = await askQuestion(question.trim());
    res.json(result);
  } catch (err) {
    console.error("[chat] askQuestion failed:", err);
    next(new BadGatewayError((err as Error).message || "Failed to answer question"));
  }
});
