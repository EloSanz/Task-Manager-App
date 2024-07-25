import { Status } from "@prisma/client";

export class TaskModel {
  id: number;
  title: string;
  description: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
  userId: number;

  constructor(task: {
    id: number;
    title: string;
    description: string;
    status: Status;
    createdAt: Date;
    updatedAt: Date;
    userId: number; 
  }) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.status = task.status;
    this.createdAt = task.createdAt;
    this.updatedAt = task.updatedAt;
    this.userId = task.userId; 
  }
}
