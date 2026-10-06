import * as courseService from "../../services/course.service";

export function listCourses(isSystemAdmin = false) {
  return courseService.listCourses(isSystemAdmin);
}
