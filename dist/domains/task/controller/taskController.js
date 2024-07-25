/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Operations related to tasks
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     TaskModel:
 *       type: object
 *       required:
 *         - id
 *         - title
 *         - description
 *         - status
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the task
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: The description of the task
 *         status:
 *           type: string
 *           enum:
 *             - PENDING
 *             - IN_PROGRESS
 *             - COMPLETED
 *           description: The status of the task
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the task was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the task was last updated
 *
 *     Error401:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Unauthorized access. Please provide a token or a valid token."
 *         code:
 *           type: integer
 *           example: 401
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "An error occurred"
 *         code:
 *           type: integer
 *           example: 500
 *
 *     InvalidRequestBody:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Invalid request body"
 *         code:
 *           type: integer
 *           example: 400
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
/**
 * @swagger
 * /task:
 *   get:
 *     summary: Retrieve all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TaskModel'
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error401'
 *       500:
 *         description: Error retrieving tasks
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /task/{id}:
 *   get:
 *     summary: Retrieve a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to retrieve
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The task with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskModel'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error retrieving task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *               description:
 *                 type: string
 *                 description: The description of the task
 *               status:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - IN_PROGRESS
 *                   - COMPLETED
 *                 description: The status of the task
 *             required:
 *               - title
 *               - description
 *               - status
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskModel'
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidRequestBody'
 *       500:
 *         description: Error creating task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /task/{id}:
 *   put:
 *     summary: Update a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the task
 *               description:
 *                 type: string
 *                 description: The description of the task
 *               status:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - IN_PROGRESS
 *                   - COMPLETED
 *                 description: The status of the task
 *             required:
 *               - title
 *               - description
 *               - status
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The updated task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TaskModel'
 *       400:
 *         description: Invalid request body
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidRequestBody'
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error updating task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Delete a task by ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the task to delete
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Error deleting task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
import { Router } from "express";
import { validateTask, validateTaskUpdate, } from "../../validators/taskValidator.js";
import prisma from "../../../prisma/prismaClient.js";
import { TaskRepository } from "../repository/task.repository.js";
import { TaskModel } from "../task.model.js";
import { TaskService } from "../service/task.service.js";
import { authenticate } from "../../../middleware/authentication.js";
const taskRepository = new TaskRepository(prisma);
const taskService = new TaskService(taskRepository);
export const taskRouter = Router();
taskRouter.use(authenticate);
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
taskRouter.get("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
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
        const { title, description, status } = req.body;
        const validationErrors = await validateTask({ title, description, status });
        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }
        const newTask = await taskService.createTask({
            title,
            description,
            status,
        });
        const taskModel = new TaskModel(newTask);
        return res.status(201).json(taskModel);
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Error creating task" });
    }
});
taskRouter.put("/", async (req, res) => {
    try {
        const taskId = req.params.id;
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
        const taskId = req.params.id;
        await taskService.deleteTask(taskId);
        return res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error deleting task" });
    }
});
