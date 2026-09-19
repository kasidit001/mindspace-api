import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { CHAT_MODEL, OPENROUTER_BASE_URL } from "../config/constants";
import { searchSimilarChunks } from "./embedding.service";
import type { RetrievedChunk } from "../interfaces/embedding.interface";
import type { AskResult, StreamEvent } from "../interfaces/chat.interface";

const chatModel = new ChatOpenAI({
  model: CHAT_MODEL,
  temperature: 0.2,
  configuration: { baseURL: OPENROUTER_BASE_URL },
});

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

function buildMessages(question: string, context: string) {
  return [
    new SystemMessage(
      "You are a TypeScript tutor. Answer the user's question using ONLY the numbered lesson " +
        "excerpts below as source material. Cite lessons by name inline (e.g. \"as covered in " +
        "'Lesson Title'\"). If the excerpts don't contain the answer, say so plainly instead of " +
        "guessing.\n\n" +
        context
    ),
    new HumanMessage(question),
  ];
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
  const response = await chatModel.invoke(buildMessages(question, context));

  return {
    answer: typeof response.content === "string" ? response.content : JSON.stringify(response.content),
    references: dedupeReferences(chunks),
  };
}

/**
 * Same retrieval + grounding as askQuestion, but yields the answer token-by-token
 * (via ChatOpenAI's streaming API) so the caller can forward it as SSE. Ends with a
 * single "done" event carrying the references, mirroring askQuestion's return shape.
 */
export async function* streamAnswer(question: string): AsyncGenerator<StreamEvent> {
  const chunks = await searchSimilarChunks(question, 5);

  if (chunks.length === 0) {
    yield { type: "token", token: "I don't have any lesson content indexed yet, so I can't answer that." };
    yield { type: "done", references: [] };
    return;
  }

  const context = buildContext(chunks);
  const stream = await chatModel.stream(buildMessages(question, context));

  for await (const messageChunk of stream) {
    const token = typeof messageChunk.content === "string" ? messageChunk.content : "";
    if (token) yield { type: "token", token };
  }

  yield { type: "done", references: dedupeReferences(chunks) };
}
