import { Request, Response, NextFunction } from "express";
import { validateCreateUser } from "../domains/validators/userValidator.js";

export async function validateCredentialsUserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password } = req.body;
  const validationErrors = await validateCreateUser({ username, password });

  if (validationErrors.length > 0) {
    return res.status(400).json({ errors: validationErrors });
  }

  next();
}
