import { Router } from "express";
import * as chatController from "../controllers/ChatController";

export const chatRouter = Router();

// POST /api/chat/ask  { question: string, stream?: boolean } — see ChatController.ts
// for the streaming (SSE) vs single-JSON-response branches.
chatRouter.post("/chat/ask", chatController.ask);
