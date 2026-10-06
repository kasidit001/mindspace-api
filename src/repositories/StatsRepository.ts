import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import type { StatsCounts } from "../interfaces/stats.interface";

export async function getCounts(): Promise<StatsCounts> {
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

  return {
    courseCount: Number(row!.course_count),
    lessonCount: Number(row!.lesson_count),
    embeddedChunkCount: Number(row!.embedded_chunk_count),
  };
}
