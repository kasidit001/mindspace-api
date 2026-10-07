import * as searchService from "../../services/search.service";

export function searchLessons(q: string) {
  return searchService.searchLessons(q);
}
