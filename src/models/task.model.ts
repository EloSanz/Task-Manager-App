import { Status } from "@prisma/client";

export class TaskModel {
    id: string;
    title: string;
    description: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;

    constructor(task: {
        id: string;
        title: string;
        description: string;
        status: Status;
        createdAt: Date;
        updatedAt: Date;
    }) {
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
        this.status = task.status;
        this.createdAt = task.createdAt;
        this.updatedAt = task.updatedAt;
    }
}
