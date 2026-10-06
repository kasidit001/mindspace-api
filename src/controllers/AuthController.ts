import type { Request, Response, NextFunction } from "express";
import { signup as signupUseCase } from "../usecases/auth/signup.usecase";
import { login as loginUseCase } from "../usecases/auth/login.usecase";
import { BadRequestError } from "../utils/errors";

// POST /api/auth/signup  { name: string, email: string, password: string }
export async function signup(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { name, email, password } = req.body ?? {};

  if (typeof name !== "string" || !name.trim()) {
    next(new BadRequestError("Body must include a non-empty 'name' string"));
    return;
  }
  if (typeof email !== "string" || !email.trim()) {
    next(new BadRequestError("Body must include a non-empty 'email' string"));
    return;
  }
  if (typeof password !== "string" || password.length < 6) {
    next(new BadRequestError("'password' must be a string of at least 6 characters"));
    return;
  }

  try {
    const result = await signupUseCase({ name, email, password });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

// POST /api/auth/login  { email: string, password: string }
export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  const { email, password } = req.body ?? {};

  if (typeof email !== "string" || typeof password !== "string") {
    next(new BadRequestError("Body must include 'email' and 'password' strings"));
    return;
  }

  try {
    const result = await loginUseCase({ email, password });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// GET /api/auth/me — returns the caller's own account for a valid session token.
export function me(req: Request, res: Response): void {
  res.json({ user: req.user });
}
