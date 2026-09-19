import * as statsRepository from "../repositories/stats.repository";

export function getStats() {
  return statsRepository.getCounts();
}
