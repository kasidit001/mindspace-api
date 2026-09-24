import { randomUUID } from "node:crypto";
import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import type { InsertChunkData, SimilarChunkRow } from "../interfaces/embedding.interface";

/** pgvector expects a "[0.1,0.2,...]" text literal, cast to ::vector in SQL. */
function toVectorLiteral(vector: number[]): string {
  return `[${vector.join(",")}]`;
}

export function insertChunk(data: InsertChunkData): Promise<unknown> {
  return sequelize.query(
    `INSERT INTO lesson_embeddings (id, lesson_id, chunk_index, content, model, embedding, "createdAt", "updatedAt")
     VALUES (:id, :lessonId, :chunkIndex, :content, :model, :embedding::vector, NOW(), NOW())`,
    {
      replacements: {
        id: randomUUID(),
        lessonId: data.lessonId,
        chunkIndex: data.chunkIndex,
        content: data.content,
        model: data.model,
        embedding: toVectorLiteral(data.embedding),
      },
    }
  );
}

export function deleteByLessonId(lessonId: string): Promise<unknown> {
  return sequelize.query("DELETE FROM lesson_embeddings WHERE lesson_id = :id", {
    replacements: { id: lessonId },
  });
}

/** Returns the top-k lesson_embeddings rows closest to `queryVector` (cosine distance). */
export async function findSimilarChunks(queryVector: number[], k: number): Promise<SimilarChunkRow[]> {
  const rows = await sequelize.query<{
    content: string;
    chunk_index: number;
    distance: number;
    lesson_id: string;
    lesson_title: string;
    lesson_slug: string;
    course_title: string;
  }>(
    `SELECT le.content,
            le.chunk_index,
            (le.embedding <=> :queryEmbedding::vector) AS distance,
            l.id AS lesson_id,
            l.title_en AS lesson_title,
            l.slug AS lesson_slug,
            c.title AS course_title
       FROM lesson_embeddings le
       JOIN lessons l ON l.id = le.lesson_id
       JOIN courses c ON c.id = l.course_id
      WHERE c.published = true
      ORDER BY distance ASC
      LIMIT :k`,
    {
      replacements: { queryEmbedding: toVectorLiteral(queryVector), k },
      type: QueryTypes.SELECT,
    }
  );

  return rows.map((r) => ({
    content: r.content,
    chunkIndex: r.chunk_index,
    distance: r.distance,
    lessonId: r.lesson_id,
    lessonTitle: r.lesson_title,
    lessonSlug: r.lesson_slug,
    courseTitle: r.course_title,
  }));
}
