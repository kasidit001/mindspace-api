import type { Request, Response, NextFunction } from "express";
import { getStats as getStatsUseCase } from "../usecases/stats/getStats.usecase";

export async function getStats(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const stats = await getStatsUseCase();
    res.json(stats);
  } catch (err) {
    next(err);
  }
}
