import * as roleRepository from "../repositories/role.repository";

export function findByName(name: string) {
  return roleRepository.findByName(name);
}
