import * as searchRepository from "../repositories/search.repository";

export function searchLessons(q: string) {
  return searchRepository.searchLessons(q);
}
