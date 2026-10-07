import * as chatService from "../../services/chat.service";
import type { AskResult } from "../../interfaces/chat.interface";

export function askQuestion(question: string): Promise<AskResult> {
  return chatService.askQuestion(question);
}
