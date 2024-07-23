import { Router } from "express";
import taskRouter from "./task.routes.js"
import authRouter from "./auth.routes.js";

const router: Router = Router();
router.use("/task", taskRouter);
router.use("/auth", authRouter);


export default router;
