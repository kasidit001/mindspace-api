import { Router } from "express";
import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import { Course, Lesson } from "../models";
import { NotFoundError } from "../utils/errors";

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
      description_en: string | null;
      description_th: string | null;
      lesson_count: string;
    }>(
      `SELECT c.id, c.title, c.slug, c.description_en, c.description_th, COUNT(l.id)::int AS lesson_count
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
        descriptionEn: r.description_en,
        descriptionTh: r.description_th,
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
      include: [
        { model: Lesson, as: "lessons", attributes: ["id", "titleEn", "titleTh", "slug", "order"] },
      ],
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
