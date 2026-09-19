import type { Request, Response, NextFunction } from "express";
import { completeLesson as completeLessonUseCase } from "../usecases/progress/completeLesson.usecase";
import { listProgress as listProgressUseCase } from "../usecases/progress/listProgress.usecase";

// POST /api/lessons/:id/complete — idempotent: marks a lesson complete for the
// authenticated user, or refreshes completedAt if it's already marked complete.
export async function completeLesson(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const progress = await completeLessonUseCase(req.user!.id, req.params.id!);
    res.json(progress);
  } catch (err) {
    next(err);
  }
}

// GET /api/progress — the authenticated user's completed lessons, with lesson/course context.
export async function listProgress(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const progress = await listProgressUseCase(req.user!.id);
    res.json(progress);
  } catch (err) {
    next(err);
  }
}
