import { Router } from "express";
import { userRouter } from "../domains/user/controller/userController.js";
import { taskRouter } from "../domains/task/controller/taskController.js";
const router = Router();
router.use("/task", taskRouter);
router.use("/auth", userRouter);
export default router;
