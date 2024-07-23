import { PrismaClient, Task, Status } from "@prisma/client";
import { TaskModel } from "../models/task.model.js";


export class TaskRepository {
    constructor(private readonly prisma: PrismaClient) {}

    async getAllTasks(): Promise<Task[]> {
        return this.prisma.task.findMany();
    }

    async getTaskById(id: string): Promise<Task | null> {
        return this.prisma.task.findUnique({ where: { id } });
    }

    async createTask(data: { title: string; description: string; status: Status }): Promise<TaskModel> {
        const createdTask = await this.prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
                status: data.status, // `status` debe ser del tipo `Status` importado
            },
        });
        return new TaskModel(createdTask);
    }

    async updateTask(id: string, data: { title?: string; description?: string; status?: Status }): Promise<Task> {
        return this.prisma.task.update({ where: { id }, data });
    }

    async deleteTask(id: string): Promise<void> {
        await this.prisma.task.delete({ where: { id } });
    }
}
