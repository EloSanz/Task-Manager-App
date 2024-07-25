import { Router } from "express";
import { userRouter } from "../domains/user/controller/userController.js";
import { taskRouter } from "../domains/task/controller/taskController.js";

const router: Router = Router();
router.use("/task", taskRouter);
router.use("/user", userRouter);


export default router;
