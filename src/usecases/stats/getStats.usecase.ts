import * as statsService from "../../services/stats.service";

export function getStats() {
  return statsService.getStats();
}
