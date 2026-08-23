import { Router } from "express";
import { QueryTypes } from "sequelize";
import sequelize from "../config/database";

export const statsRouter = Router();

// GET /api/stats — landing-page hero numbers.
statsRouter.get("/stats", async (_req, res, next) => {
  try {
    const [row] = await sequelize.query<{
      course_count: string;
      lesson_count: string;
      embedded_chunk_count: string;
    }>(
      `SELECT
         (SELECT COUNT(*) FROM courses) AS course_count,
         (SELECT COUNT(*) FROM lessons) AS lesson_count,
         (SELECT COUNT(*) FROM lesson_embeddings) AS embedded_chunk_count`,
      { type: QueryTypes.SELECT }
    );

    res.json({
      courseCount: Number(row.course_count),
      lessonCount: Number(row.lesson_count),
      embeddedChunkCount: Number(row.embedded_chunk_count),
    });
  } catch (err) {
    next(err);
  }
});
