export class TaskModel {
    constructor(task) {
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
        this.status = task.status;
        this.createdAt = task.createdAt;
        this.updatedAt = task.updatedAt;
    }
}
