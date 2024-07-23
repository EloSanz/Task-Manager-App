import { TaskModel } from "../task/task.model.js";
export class TaskRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllTasks() {
        return this.prisma.task.findMany();
    }
    async getTaskById(id) {
        return this.prisma.task.findUnique({ where: { id } });
    }
    async createTask(data) {
        const createdTask = await this.prisma.task.create({
            data: {
                title: data.title,
                description: data.description,
                status: data.status,
            },
        });
        return new TaskModel(createdTask);
    }
    async updateTask(id, data) {
        return this.prisma.task.update({ where: { id }, data });
    }
    async deleteTask(id) {
        await this.prisma.task.delete({ where: { id } });
    }
}
