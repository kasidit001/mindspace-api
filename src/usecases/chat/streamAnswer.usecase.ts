import * as chatService from "../../services/chat.service";
import type { StreamEvent } from "../../interfaces/chat.interface";

export function streamAnswer(question: string): AsyncGenerator<StreamEvent> {
  return chatService.streamAnswer(question);
}
