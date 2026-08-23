import { Router } from "express";
import { Course, Lesson } from "../models";
import { NotFoundError } from "../utils/errors";

export const coursesRouter = Router();

// GET /api/courses
coursesRouter.get("/courses", async (_req, res, next) => {
  try {
    const courses = await Course.findAll({
      include: [{ model: Lesson, as: "lessons", attributes: ["id", "title", "slug", "order"] }],
      order: [["createdAt", "ASC"]],
    });
    res.json(courses);
  } catch (err) {
    next(err);
  }
});

// GET /api/lessons/:id
coursesRouter.get("/lessons/:id", async (req, res, next) => {
  try {
    const lesson = await Lesson.findByPk(req.params.id, {
      include: [{ model: Course, as: "course", attributes: ["id", "title", "slug"] }],
    });

    if (!lesson) {
      throw new NotFoundError("Lesson not found");
    }

    res.json(lesson);
  } catch (err) {
    next(err);
  }
});
