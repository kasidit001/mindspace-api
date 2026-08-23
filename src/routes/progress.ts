import { Router } from "express";
import { Course, Lesson, Progress } from "../models";

export const progressRouter = Router();

// POST /api/lessons/:id/complete — idempotent: marks a lesson complete, or refreshes
// completedAt if it's already marked complete.
progressRouter.post("/lessons/:id/complete", async (req, res, next) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) {
      res.status(404).json({ error: "NotFoundError", message: "Lesson not found" });
      return;
    }

    const [progress] = await Progress.upsert({
      lessonId: lesson.id,
      completed: true,
      completedAt: new Date(),
    });

    res.json(progress);
  } catch (err) {
    next(err);
  }
});

// GET /api/progress — all completed lessons, with lesson/course context.
progressRouter.get("/progress", async (_req, res, next) => {
  try {
    const progress = await Progress.findAll({
      include: [
        {
          model: Lesson,
          as: "lesson",
          attributes: ["id", "title", "slug"],
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
