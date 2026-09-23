import * as tagRepository from "../repositories/tag.repository";

export function listTags() {
  return tagRepository.findAll();
}

function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Idempotent: returns the existing tag if `name` is already taken, otherwise creates it. */
export async function findOrCreateByName(name: string) {
  const existing = await tagRepository.findByName(name);
  if (existing) return existing;
  return tagRepository.create({ name, slug: slugify(name) });
}

export function attachToCourse(courseId: string, tagId: string) {
  return tagRepository.attachToCourse(courseId, tagId);
}
