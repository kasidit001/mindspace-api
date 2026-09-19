import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import { Course, Lesson } from "../models";
import type { FeaturedCourseRow } from "../interfaces/course.interface";

/** Course overview + lesson counts, for the landing-page hero. Top 6, oldest first. */
export async function findFeaturedWithLessonCounts(): Promise<FeaturedCourseRow[]> {
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

  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    descriptionEn: r.description_en,
    descriptionTh: r.description_th,
    lessonCount: Number(r.lesson_count),
  }));
}

export function findAllWithLessons() {
  return Course.findAll({
    include: [
      { model: Lesson, as: "lessons", attributes: ["id", "titleEn", "titleTh", "slug", "order", "contentType"] },
    ],
    order: [["createdAt", "ASC"]],
  });
}
