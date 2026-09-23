import { Course, Tag } from "../models";
import type { CreateTagData } from "../interfaces/tag.interface";

export function findAll() {
  return Tag.findAll({ order: [["name", "ASC"]] });
}

export function findByName(name: string) {
  return Tag.findOne({ where: { name } });
}

export function create(data: CreateTagData) {
  return Tag.create(data);
}

/** Idempotent: attaching a tag a course already has is a no-op, not a duplicate row. */
export async function attachToCourse(courseId: string, tagId: string): Promise<void> {
  const course = await Course.findByPk(courseId);
  if (!course) return;
  await course.addTag(tagId);
}
