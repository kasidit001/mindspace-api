import type { Request, Response, NextFunction } from "express";
import { askQuestion as askQuestionUseCase } from "../usecases/chat/askQuestion.usecase";
import { streamAnswer as streamAnswerUseCase } from "../usecases/chat/streamAnswer.usecase";
import { BadGatewayError } from "../utils/errors";
import { askQuestionSchema } from "../schemas/chat.schema";
import { parse } from "../schemas/validate";

// POST /api/chat/ask  { question: string, stream?: boolean }
// stream: true switches the response to Server-Sent Events (text/event-stream),
// emitting "token" events as the answer generates and a final "done" event with
// the references -- same convention as OpenAI/OpenRouter's own `stream` flag.
// Default (stream omitted/false) keeps the original single-JSON-response shape.
export async function ask(req: Request, res: Response, next: NextFunction): Promise<void> {
  let input: ReturnType<typeof askQuestionSchema.parse>;
  try {
    input = parse(askQuestionSchema, req.body ?? {});
  } catch (err) {
    next(err);
    return;
  }

  if (input.stream === true) {
    await handleStreamingAsk(input.question, res);
    return;
  }

  try {
    const result = await askQuestionUseCase(input.question);
    res.json(result);
  } catch (err) {
    console.error("[chat] askQuestion failed:", err);
    next(new BadGatewayError((err as Error).message || "Failed to answer question"));
  }
}

async function handleStreamingAsk(question: string, res: Response): Promise<void> {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const send = (event: string, data: unknown) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
  };

  // res.on("close"), not req.on("close") -- the request's own 'close' can fire as soon
  // as its (small) body finishes reading, well before the client actually disconnects,
  // which was cutting the stream off before the first token ever went out.
  let clientGone = false;
  res.on("close", () => {
    clientGone = true;
  });

  try {
    for await (const evt of streamAnswerUseCase(question)) {
      if (clientGone) break;
      if (evt.type === "token") {
        send("token", { token: evt.token });
      } else {
        send("done", { references: evt.references });
      }
    }
  } catch (err) {
    console.error("[chat] streamAnswer failed:", err);
    // Headers are already sent (SSE), so this can't go through the normal error
    // middleware -- emit an "error" SSE event in the same { error, message } shape
    // as the rest of the API's error responses instead.
    if (!clientGone) {
      const gatewayErr = new BadGatewayError((err as Error).message || "Streaming failed");
      send("error", { error: gatewayErr.name, message: gatewayErr.message });
    }
  } finally {
    res.end();
  }
}
