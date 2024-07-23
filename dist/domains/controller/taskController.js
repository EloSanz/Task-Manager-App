/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Operations related to tasks
 */
import { validateTask, validateTaskUpdate } from "../../validators/taskValidator.js";
import prisma from "../../prisma/prismaClient.js";
import { TaskRepository } from "../repository/task.repository.js";
import { TaskModel } from "../task/task.model.js";
const taskRepository = new TaskRepository(prisma);
export async function getAllTasks(req, res) {
    try {
        const tasks = await taskRepository.getAllTasks();
        const taskModels = tasks.map(task => new TaskModel(task));
        return res.json(taskModels);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error retrieving tasks" });
    }
}
export async function getTaskById(req, res) {
    try {
        const taskId = req.params.id;
        const task = await taskRepository.getTaskById(taskId);
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
}
export async function createTask(req, res) {
    try {
        const { title, description, status } = req.body;
        const validationErrors = await validateTask({ title, description, status });
        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }
        const newTask = await taskRepository.createTask({ title, description, status });
        const taskModel = new TaskModel(newTask);
        return res.status(201).json(taskModel);
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error creating task" });
    }
}
export async function updateTask(req, res) {
    try {
        const taskId = req.params.id;
        const { title, description, status } = req.body;
        const validationErrors = await validateTaskUpdate({ title, description, status });
        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }
        const updatedTask = await taskRepository.updateTask(taskId, { title, description, status });
        const taskModel = new TaskModel(updatedTask);
        return res.json(taskModel);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error updating task" });
    }
}
export async function deleteTask(req, res) {
    try {
        const taskId = req.params.id;
        await taskRepository.deleteTask(taskId);
        return res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting task" });
    }
}
