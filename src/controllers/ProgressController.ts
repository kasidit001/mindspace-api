import type { Request, Response, NextFunction } from "express";
import { completeLesson as completeLessonUseCase } from "../usecases/progress/CompleteLessonUseCase";
import { listProgress as listProgressUseCase } from "../usecases/progress/ListProgressUseCase";

export async function completeLesson(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const progress = await completeLessonUseCase(req.user!.id, req.params.id!);
    res.json(progress);
  } catch (err) {
    next(err);
  }
}

export async function listProgress(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const progress = await listProgressUseCase(req.user!.id);
    res.json(progress);
  } catch (err) {
    next(err);
  }
}
