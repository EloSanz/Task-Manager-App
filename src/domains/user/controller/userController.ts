import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import prisma from "../../../prisma/prismaClient.js";
import { UserRepository } from "../repository/user-repository.js";
import { UserService } from "../service/userService.js";
import { UserModel } from "../user.model.js";
import { validateCredentialsUserMiddleware } from "../../../middleware/validateCreateUserMiddleware.js";
import { hashPasswordMiddleware } from "../../../middleware/hashPasswordMiddleware.js";
import { parseAndValidateId } from "../../task/controller/taskController.js";
import { AppError, UserNotFoundError } from "../../../errors/customErrors.js";

dotenv.config();

export const userRouter: Router = Router();

const userRepository = new UserRepository(prisma);
const userService: UserService = new UserService(userRepository);


userRouter.post(
  "/register",
  validateCredentialsUserMiddleware,
  hashPasswordMiddleware,
  async function (req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const user = await userService.createUser({ username, password });
      const userModel = new UserModel(user);
      return res.status(201).json(userModel);
    } catch (error) {
      console.log("Error:", error);
      return res
        .status(409)
        .json({
          message:
            "Username is already in use. Please choose a different username.",
        });
    }
  }
);

userRouter.post("/login", validateCredentialsUserMiddleware, async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const { user, token } = await userService.authenticateUser(
      username,
      password
    );

    if (!user || !token) { return res.status(401).json({ message: "Invalid credentials" }); }
    
    return res.json({ token });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ message: "Error logging in" });
  }
});

userRouter.get("/:id/tasks", async (req: Request, res: Response) => {
  try {
    const userId: number | null = parseAndValidateId(req.params.id);
    if (userId === null) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const tasks = await userService.getTasksById(userId);
    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    if (error instanceof UserNotFoundError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: "Error retrieving tasks for user" });
  }
});