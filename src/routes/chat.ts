import { Router } from "express";
import * as chatController from "../controllers/chat.controller";

export const chatRouter = Router();

// POST /api/chat/ask  { question: string, stream?: boolean } — see chat.controller.ts
// for the streaming (SSE) vs single-JSON-response branches.
chatRouter.post("/chat/ask", chatController.ask);
