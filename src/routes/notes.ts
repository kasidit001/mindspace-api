import { Router } from "express";
import * as notesController from "../controllers/notes.controller";
import { requireAuth } from "../middlewares/auth.middleware";

export const notesRouter = Router();

// POST /api/notes  { content: string, lessonId?: string, source?: "manual" | "chat" }
notesRouter.post("/notes", requireAuth, notesController.createNote);

// GET /api/notes — the authenticated user's own notes; optionally filter with ?lessonId=
notesRouter.get("/notes", requireAuth, notesController.listNotes);
