import type { Request, Response, NextFunction } from "express";
import { askQuestion as askQuestionUseCase } from "../usecases/chat/AskQuestionUseCase";
import { streamAnswer as streamAnswerUseCase } from "../usecases/chat/StreamAnswerUseCase";
import { BadGatewayError, BadRequestError } from "../utils/errors";

export async function ask(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { question, stream } = req.body ?? {};

  if (typeof question !== "string" || !question.trim()) {
    next(new BadRequestError("Body must include a non-empty 'question' string"));
    return;
  }

  if (stream === true) {
    await handleStreamingAsk(question.trim(), res);
    return;
  }

  try {
    const result = await askQuestionUseCase(question.trim());
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
    if (!clientGone) {
      const gatewayErr = new BadGatewayError((err as Error).message || "Streaming failed");
      send("error", { error: gatewayErr.name, message: gatewayErr.message });
    }
  } finally {
    res.end();
  }
}
