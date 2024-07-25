import { Router } from "express";
import { validateTaskUpdate, } from "../../validators/taskValidator.js";
import prisma from "../../../prisma/prismaClient.js";
import { TaskRepository } from "../repository/task.repository.js";
import { TaskModel } from "../task.model.js";
import { TaskService } from "../service/task.service.js";
import { UserRepository } from "../../user/repository/user-repository.js";
import { AppError } from "../../../errors/customErrors.js";
const taskRepository = new TaskRepository(prisma);
const userRepository = new UserRepository(prisma);
const taskService = new TaskService(taskRepository, userRepository);
export const taskRouter = Router();
//taskRouter.use(authenticate);
taskRouter.get("/", async (req, res) => {
    try {
        const tasks = await taskService.getAllTasks();
        const taskModels = tasks.map((task) => new TaskModel(task));
        return res.json(taskModels);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving tasks" });
    }
});
function parseAndValidateId(id) {
    const parsedId = parseInt(id, 10);
    return Number.isInteger(parsedId) ? parsedId : null;
}
taskRouter.get("/:id", async (req, res) => {
    try {
        const taskIdString = req.params.id;
        const taskId = parseAndValidateId(taskIdString);
        if (taskId === null) {
            return res.status(400).json({ message: "Invalid task ID format" });
        }
        const task = await taskService.getTaskById(taskId);
        if (task) {
            const taskModel = new TaskModel(task);
            return res.json(taskModel);
        }
        else {
            return res.status(404).json({ message: "Task not found" });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving task" });
    }
});
taskRouter.post("/", async (req, res) => {
    try {
        const { title, description, status, userId } = req.body;
        const validationErrors = await validateTaskUpdate({
            title,
            description,
            status,
        });
        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }
        const newTask = await taskService.createTask({
            title,
            description,
            status,
            userId,
        });
        const taskModel = new TaskModel(newTask);
        return res.status(201).json(taskModel);
    }
    catch (error) {
        console.error("Error:", error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ message: error.message });
        }
        // Manejo genérico de errores
        return res.status(500).json({ message: "Error creating task" });
    }
});
taskRouter.put("/", async (req, res) => {
    try {
        const taskIdString = req.params.id;
        const taskId = parseAndValidateId(taskIdString);
        if (taskId === null) {
            return res.status(400).json({ message: "Invalid task ID format" });
        }
        const { title, description, status } = req.body;
        const validationErrors = await validateTaskUpdate({
            title,
            description,
            status,
        });
        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }
        const updatedTask = await taskService.updateTask(taskId, {
            title,
            description,
            status,
        });
        const taskModel = new TaskModel(updatedTask);
        return res.json(taskModel);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating task" });
    }
});
taskRouter.delete("/", async (req, res) => {
    try {
        const taskIdString = req.params.id;
        const taskId = parseAndValidateId(taskIdString);
        if (taskId === null) {
            return res.status(400).json({ message: "Invalid task ID format" });
        }
        await taskService.deleteTask(taskId);
        return res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting task" });
    }
});
