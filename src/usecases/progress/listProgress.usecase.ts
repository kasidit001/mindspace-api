import * as progressService from "../../services/progress.service";

export function listProgress(userId: string) {
  return progressService.listProgress(userId);
}
