import type { Request, Response, NextFunction } from "express";
import { searchLessons as searchLessonsUseCase } from "../usecases/search/searchLessons.usecase";
import { BadRequestError } from "../utils/errors";

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
