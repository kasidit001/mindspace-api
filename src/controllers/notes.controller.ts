import type { Request, Response, NextFunction } from "express";
import { createNote as createNoteUseCase } from "../usecases/notes/createNote.usecase";
import { listNotes as listNotesUseCase } from "../usecases/notes/listNotes.usecase";
import { createNoteSchema } from "../schemas/notes.schema";
import { parse } from "../schemas/validate";

// POST /api/notes  { content: string, lessonId?: string, source?: "manual" | "chat" }
export async function createNote(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const input = parse(createNoteSchema, req.body ?? {});
    const note = await createNoteUseCase({ userId: req.user!.id, ...input });
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
