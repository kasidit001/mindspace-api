import * as courseRepository from "../repositories/course.repository";

export function getFeaturedCourses() {
  return courseRepository.findFeaturedWithLessonCounts();
}

export function listCourses(includeUnpublished = false) {
  return courseRepository.findAllWithLessons(includeUnpublished);
}
