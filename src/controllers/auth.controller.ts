import type { Request, Response, NextFunction } from "express";
import { signup as signupUseCase } from "../usecases/auth/signup.usecase";
import { login as loginUseCase } from "../usecases/auth/login.usecase";
import { signupSchema, loginSchema } from "../schemas/auth.schema";
import { parse } from "../schemas/validate";

// POST /api/auth/signup  { name: string, email: string, password: string }
export async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const input = parse(signupSchema, req.body ?? {});
    const result = await signupUseCase(input);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login  { email: string, password: string }
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const input = parse(loginSchema, req.body ?? {});
    const result = await loginUseCase(input);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// GET /api/auth/me — returns the caller's own account for a valid session token.
export function me(req: Request, res: Response): void {
  res.json({ user: req.user });
}
