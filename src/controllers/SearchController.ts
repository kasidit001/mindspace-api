import type { Request, Response, NextFunction } from "express";
import { searchLessons as searchLessonsUseCase } from "../usecases/search/searchLessons.usecase";
import { BadRequestError } from "../utils/errors";

// GET /api/search?q=query — full-text keyword search over lesson title + content,
// for the Cmd+K spotlight search. This is plain Postgres full-text search, separate
// from the pgvector semantic search used by /api/chat/ask -- keyword search is what
// a "jump to this exact lesson" spotlight needs; RAG retrieval is for chat grounding.
export async function search(req: Request, res: Response, next: NextFunction): Promise<void> {
  const q = typeof req.query.q === "string" ? req.query.q.trim() : "";

  if (!q) {
    next(new BadRequestError("Query parameter 'q' is required"));
    return;
  }

  try {
    const results = await searchLessonsUseCase(q);
    res.json(results);
  } catch (err) {
    next(err);
  }
}
