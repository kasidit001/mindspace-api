import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import { Course, Lesson, Tag } from "../models";
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
      WHERE c.published = true
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

// `includeUnpublished` exists so a SYSTEM_ADMIN can browse their own draft
// courses — the default (false) keeps the public catalog behavior unchanged.
export function findAllWithLessons(includeUnpublished = false) {
  return Course.findAll({
    where: includeUnpublished ? {} : { published: true },
    include: [
      {
        model: Lesson,
        as: "lessons",
        attributes: [
          "id", "titleEn", "titleTh", "slug", "order", "contentType",
          // Same 200wpm estimate the lesson page shows, so a course's total matches its lessons.
          [
            sequelize.literal(
              `GREATEST(1, ROUND(cardinality(regexp_split_to_array(btrim("lessons"."content_en"), '\\s+')) / 200.0))::int`
            ),
            "readingMinutes",
          ],
        ],
      },
      { model: Tag, as: "tags", attributes: ["id", "name", "slug"], through: { attributes: [] } },
    ],
    // Without an explicit order on the association, Postgres/Sequelize
    // returns each course's lessons in whatever order the join happens to
    // produce — not lesson order — which is what made the lesson sidebar
    // (CourseSidebarLessons.vue) list them out of sequence.
    order: [
      ["createdAt", "ASC"],
      [{ model: Lesson, as: "lessons" }, "order", "ASC"],
    ],
  });
}
