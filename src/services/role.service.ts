import * as roleRepository from "../repositories/RoleRepository";

export function findByName(name: string) {
  return roleRepository.findByName(name);
}
