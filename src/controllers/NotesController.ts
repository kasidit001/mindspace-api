import type { Request, Response, NextFunction } from "express";
import { createNote as createNoteUseCase } from "../usecases/notes/createNote.usecase";
import { listNotes as listNotesUseCase } from "../usecases/notes/listNotes.usecase";
import { BadRequestError } from "../utils/errors";

// POST /api/notes  { content: string, lessonId?: string, source?: "manual" | "chat" }
export async function createNote(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { content, lessonId, source } = req.body ?? {};

  if (typeof content !== "string" || !content.trim()) {
    next(new BadRequestError("Body must include a non-empty 'content' string"));
    return;
  }

  if (source !== undefined && source !== "manual" && source !== "chat") {
    next(new BadRequestError("'source' must be 'manual' or 'chat'"));
    return;
  }

  try {
    const note = await createNoteUseCase({ userId: req.user!.id, content, lessonId, source });
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
}

// GET /api/notes — the authenticated user's own notes; optionally filter with ?lessonId=
export async function listNotes(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { lessonId } = req.query;
    const notes = await listNotesUseCase(req.user!.id, typeof lessonId === "string" ? lessonId : undefined);
    res.json(notes);
  } catch (err) {
    next(err);
  }
}
