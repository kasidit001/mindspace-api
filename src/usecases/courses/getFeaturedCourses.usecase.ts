import * as courseService from "../../services/course.service";

export function getFeaturedCourses() {
  return courseService.getFeaturedCourses();
}
