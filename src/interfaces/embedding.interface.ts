export interface InsertChunkData {
  lessonId: string;
  chunkIndex: number;
  content: string;
  model: string;
  embedding: number[];
}

export interface SimilarChunkRow {
  content: string;
  chunkIndex: number;
  distance: number;
  lessonId: string;
  lessonTitle: string;
  lessonSlug: string;
  courseTitle: string;
}

/** Same shape as SimilarChunkRow — named separately for readability at the call site. */
export type RetrievedChunk = SimilarChunkRow;
