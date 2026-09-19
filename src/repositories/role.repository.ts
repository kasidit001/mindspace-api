import { Role } from "../models";

export function findByName(name: string) {
  return Role.findOne({ where: { name } });
}
