import { Course, Lesson } from "../models";

export function findByIdWithCourse(id: string) {
  return Lesson.findByPk(id, {
    include: [{ model: Course, as: "course", attributes: ["id", "title", "slug"] }],
  });
}

export function findById(id: string) {
  return Lesson.findByPk(id);
}
