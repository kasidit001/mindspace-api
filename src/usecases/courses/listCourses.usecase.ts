import * as courseService from "../../services/course.service";

export function listCourses() {
  return courseService.listCourses();
}
