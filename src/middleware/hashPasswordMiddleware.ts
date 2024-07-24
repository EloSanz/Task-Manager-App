import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

export async function hashPasswordMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    req.body.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
}
