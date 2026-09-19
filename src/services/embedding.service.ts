import { OpenAIEmbeddings } from "@langchain/openai";
import { EMBEDDING_MODEL, OPENROUTER_BASE_URL } from "../config/constants";
import type { Lesson } from "../models/Lesson";
import * as lessonEmbeddingRepository from "../repositories/lessonEmbedding.repository";
import type { RetrievedChunk } from "../interfaces/embedding.interface";

const embeddings = new OpenAIEmbeddings({
  model: EMBEDDING_MODEL,
  configuration: { baseURL: OPENROUTER_BASE_URL },
});

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

export function embedTexts(texts: string[]): Promise<number[][]> {
  return embeddings.embedDocuments(texts);
}

/**
 * Chunks, embeds, and stores a lesson's content in lesson_embeddings.
 * English only for now — retrieval/grounding in src/services/chat.service.ts is
 * English-only too, so a Thai-only chunk would just be dead weight in the vector index.
 */
export async function embedAndStoreLesson(lesson: Lesson): Promise<number> {
  const chunks = chunkText(lesson.contentEn);
  const vectors = await embedTexts(chunks);

  for (let i = 0; i < chunks.length; i++) {
    await lessonEmbeddingRepository.insertChunk({
      lessonId: lesson.id,
      chunkIndex: i,
      content: chunks[i]!,
      model: EMBEDDING_MODEL,
      embedding: vectors[i]!,
    });
  }

  return chunks.length;
}

/** Embeds `question` and returns the top-k most similar lesson_embeddings rows (cosine distance). */
export async function searchSimilarChunks(question: string, k = 5): Promise<RetrievedChunk[]> {
  const [queryVector] = await embedTexts([question]);
  return lessonEmbeddingRepository.findSimilarChunks(queryVector!, k);
}
