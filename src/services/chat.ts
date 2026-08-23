import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { CHAT_MODEL } from "../config/constants";
import { searchSimilarChunks, type RetrievedChunk } from "./embeddings";

const chatModel = new ChatOpenAI({ model: CHAT_MODEL, temperature: 0.2 });

export interface AskResult {
  answer: string;
  references: Array<{
    lessonId: string;
    lessonTitle: string;
    lessonSlug: string;
    courseTitle: string;
  }>;
}

function buildContext(chunks: RetrievedChunk[]): string {
  return chunks
    .map(
      (c, i) =>
        `[${i + 1}] Lesson: "${c.lessonTitle}" (course: "${c.courseTitle}")\n${c.content}`
    )
    .join("\n\n---\n\n");
}

function dedupeReferences(chunks: RetrievedChunk[]): AskResult["references"] {
  const seen = new Map<string, AskResult["references"][number]>();
  for (const c of chunks) {
    if (!seen.has(c.lessonId)) {
      seen.set(c.lessonId, {
        lessonId: c.lessonId,
        lessonTitle: c.lessonTitle,
        lessonSlug: c.lessonSlug,
        courseTitle: c.courseTitle,
      });
    }
  }
  return [...seen.values()];
}

/** Retrieves relevant lesson chunks via pgvector, then asks the LLM to answer grounded in them. */
export async function askQuestion(question: string): Promise<AskResult> {
  const chunks = await searchSimilarChunks(question, 5);

  if (chunks.length === 0) {
    return {
      answer: "I don't have any lesson content indexed yet, so I can't answer that.",
      references: [],
    };
  }

  const context = buildContext(chunks);

  const response = await chatModel.invoke([
    new SystemMessage(
      "You are a TypeScript tutor. Answer the user's question using ONLY the numbered lesson " +
        "excerpts below as source material. Cite lessons by name inline (e.g. \"as covered in " +
        "'Lesson Title'\"). If the excerpts don't contain the answer, say so plainly instead of " +
        "guessing.\n\n" +
        context
    ),
    new HumanMessage(question),
  ]);

  return {
    answer: typeof response.content === "string" ? response.content : JSON.stringify(response.content),
    references: dedupeReferences(chunks),
  };
}
