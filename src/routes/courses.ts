import { Router } from "express";
import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import { Course, Lesson } from "../models";

export const coursesRouter = Router();

// GET /api/courses/featured — course overview + lesson counts, for the landing-page hero.
// Registered before the generic list route for readability; no path conflict either way
// since there's no /courses/:id route to shadow.
coursesRouter.get("/courses/featured", async (_req, res, next) => {
  try {
    const rows = await sequelize.query<{
      id: string;
      title: string;
      slug: string;
      description: string | null;
      lesson_count: string;
    }>(
      `SELECT c.id, c.title, c.slug, c.description, COUNT(l.id)::int AS lesson_count
         FROM courses c
         LEFT JOIN lessons l ON l.course_id = c.id
        GROUP BY c.id
        ORDER BY c."createdAt" ASC
        LIMIT 6`,
      { type: QueryTypes.SELECT }
    );

    res.json(
      rows.map((r) => ({
        id: r.id,
        title: r.title,
        slug: r.slug,
        description: r.description,
        lessonCount: Number(r.lesson_count),
      }))
    );
  } catch (err) {
    next(err);
  }
});

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
      res.status(404).json({ error: "Lesson not found" });
      return;
    }

    res.json(lesson);
  } catch (err) {
    next(err);
  }
});
