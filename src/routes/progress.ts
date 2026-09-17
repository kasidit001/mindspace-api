import { Router } from "express";
import { Course, Lesson, Progress } from "../models";
import { requireAuth } from "../utils/auth";

export const progressRouter = Router();

// POST /api/lessons/:id/complete — idempotent: marks a lesson complete for the
// authenticated user, or refreshes completedAt if it's already marked complete.
progressRouter.post("/lessons/:id/complete", requireAuth, async (req, res, next) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) {
      res.status(404).json({ error: "NotFoundError", message: "Lesson not found" });
      return;
    }

    const [progress] = await Progress.upsert({
      userId: req.user!.id,
      lessonId: lesson.id,
      completed: true,
      completedAt: new Date(),
    });

    res.json(progress);
  } catch (err) {
    next(err);
  }
});

// GET /api/progress — the authenticated user's completed lessons, with lesson/course context.
progressRouter.get("/progress", requireAuth, async (req, res, next) => {
  try {
    const progress = await Progress.findAll({
      where: { userId: req.user!.id },
      include: [
        {
          model: Lesson,
          as: "lesson",
          attributes: ["id", "titleEn", "titleTh", "slug"],
          include: [{ model: Course, as: "course", attributes: ["id", "title", "slug"] }],
        },
      ],
      order: [["completedAt", "DESC"]],
    });

    res.json(progress);
  } catch (err) {
    next(err);
  }
});
