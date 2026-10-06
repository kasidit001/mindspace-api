import * as statsRepository from "../repositories/StatsRepository";

export function getStats() {
  return statsRepository.getCounts();
}
