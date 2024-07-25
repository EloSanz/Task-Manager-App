import { PrismaClient, Status, Task } from "@prisma/client/edge";
import { TaskModel } from "../task.model.js";


export class TaskRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAllTasks(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async getTaskById(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async createTask(data: {
    title: string;
    description: string;
    status: Status;
    userId: number;
  }): Promise<TaskModel> {
    const createdTask = await this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        userId: data.userId
      },
    });
    return new TaskModel(createdTask);
  }

  async updateTask(
    id: number,
    data: { title?: string; description?: string; status?: Status }
  ): Promise<Task> {
    return this.prisma.task.update({ where: { id }, data });
  }

  async deleteTask(id: number): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }
}
