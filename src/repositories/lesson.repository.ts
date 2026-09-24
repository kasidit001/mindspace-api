import { Course, Lesson } from "../models";

// `where: { published: true }` on the include makes it an INNER JOIN (Sequelize's
// default when an include has a where clause) — a lesson whose course is an
// unpublished draft comes back as not-found here, same as a lesson that doesn't
// exist at all, rather than leaking that a draft course exists.
export function findByIdWithCourse(id: string) {
  return Lesson.findByPk(id, {
    include: [{ model: Course, as: "course", attributes: ["id", "title", "slug"], where: { published: true } }],
  });
}
