import { randomUUID } from "node:crypto";
import { OpenAIEmbeddings } from "@langchain/openai";
import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import { EMBEDDING_MODEL, OPENROUTER_BASE_URL } from "../config/constants";
import type { Lesson } from "../models/Lesson";

const embeddings = new OpenAIEmbeddings({
  model: EMBEDDING_MODEL,
  configuration: { baseURL: OPENROUTER_BASE_URL },
});

/** pgvector expects a "[0.1,0.2,...]" text literal, cast to ::vector in SQL. */
function toVectorLiteral(vector: number[]): string {
  return `[${vector.join(",")}]`;
}

/** Splits lesson content into ~maxChars chunks on paragraph boundaries. */
export function chunkText(content: string, maxChars = 1200): string[] {
  const paragraphs = content
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const chunks: string[] = [];
  let current = "";
  for (const para of paragraphs) {
    if (current && (current.length + para.length + 2) > maxChars) {
      chunks.push(current);
      current = para;
    } else {
      current = current ? `${current}\n\n${para}` : para;
    }
  }
  if (current) chunks.push(current);
  return chunks.length ? chunks : [content];
}

/**
 * Chunks, embeds, and stores a lesson's content in lesson_embeddings.
 * English only for now — retrieval/grounding in src/services/chat.ts is English-only
 * too, so a Thai-only chunk would just be dead weight in the vector index.
 */
export async function embedAndStoreLesson(lesson: Lesson): Promise<number> {
  const chunks = chunkText(lesson.contentEn);
  const vectors = await embeddings.embedDocuments(chunks);

  for (let i = 0; i < chunks.length; i++) {
    await sequelize.query(
      `INSERT INTO lesson_embeddings (id, lesson_id, chunk_index, content, model, embedding, "createdAt", "updatedAt")
       VALUES (:id, :lessonId, :chunkIndex, :content, :model, :embedding::vector, NOW(), NOW())`,
      {
        replacements: {
          id: randomUUID(),
          lessonId: lesson.id,
          chunkIndex: i,
          content: chunks[i],
          model: EMBEDDING_MODEL,
          embedding: toVectorLiteral(vectors[i]),
        },
      }
    );
  }

  return chunks.length;
}

export interface RetrievedChunk {
  content: string;
  chunkIndex: number;
  distance: number;
  lessonId: string;
  lessonTitle: string;
  lessonSlug: string;
  courseTitle: string;
}

/** Embeds `question` and returns the top-k most similar lesson_embeddings rows (cosine distance). */
export async function searchSimilarChunks(question: string, k = 5): Promise<RetrievedChunk[]> {
  const [queryVector] = await embeddings.embedDocuments([question]);

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
