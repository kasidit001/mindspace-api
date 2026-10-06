import type { Request, Response, NextFunction } from "express";
import { getDashboard as getDashboardUseCase } from "../usecases/dashboard/getDashboard.usecase";

// GET /api/dashboard — aggregated stats, per-course progress, and streak for the
// authenticated user's Learning Dashboard.
export async function getDashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const dashboard = await getDashboardUseCase(req.user!.id);
    res.json(dashboard);
  } catch (err) {
    next(err);
  }
}
