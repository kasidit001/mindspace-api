import * as userRepository from "../repositories/user.repository";
import type { CreateUserData } from "../interfaces/user.interface";

export function findByEmail(email: string) {
  return userRepository.findByEmail(email);
}

export function findByEmailWithRole(email: string) {
  return userRepository.findByEmailWithRole(email);
}

export function findByIdWithRole(id: string) {
  return userRepository.findByIdWithRole(id);
}

export function createUser(data: CreateUserData) {
  return userRepository.create(data);
}
