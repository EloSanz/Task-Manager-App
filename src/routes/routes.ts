import { Router } from "express";
import { userRouter } from "../domains/user/controller/userController";
import { taskRouter } from "../domains/task/controller/taskController";

const router: Router = Router();
router.use("/task", taskRouter);
router.use("/user", userRouter);


export default router;
