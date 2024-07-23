export class TaskService {
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
    }
    async getAllTasks() {
        return this.taskRepository.getAllTasks();
    }
    async getTaskById(id) {
        return this.taskRepository.getTaskById(id);
    }
    async createTask(dto) {
        return this.taskRepository.createTask(dto);
    }
    async updateTask(id, dto) {
        return this.taskRepository.updateTask(id, dto);
    }
    async deleteTask(id) {
        return this.taskRepository.deleteTask(id);
    }
}
