import * as userService from "../../services/user.service";
import * as authService from "../../services/auth.service";
import { UnauthorizedError } from "../../utils/errors";
import type { LoginInput, AuthResult } from "../../interfaces/auth.interface";

export async function login(input: LoginInput): Promise<AuthResult> {
  const user = await userService.findByEmailWithRole(input.email.trim().toLowerCase());

  // Same error for "no such user" and "wrong password" — don't leak which
  // one it was, that's an account-enumeration oracle.
  if (!user || !(await authService.verifyPassword(input.password, user.passwordHash))) {
    throw new UnauthorizedError("Invalid email or password");
  }

  const token = authService.signToken(user.id);
  return { token, user: { id: user.id, name: user.name, email: user.email, role: user.role!.name } };
}
