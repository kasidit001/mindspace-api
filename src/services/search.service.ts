import * as searchRepository from "../repositories/SearchRepository";

export function searchLessons(q: string) {
  return searchRepository.searchLessons(q);
}
