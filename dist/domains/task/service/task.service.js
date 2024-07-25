import { UserNotFoundError } from "../../../errors/customErrors.js";
export class TaskService {
    constructor(taskRepository, userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }
    async createTask(dto) {
        if (await this.userRepository.existById(dto.userId)) {
            return this.taskRepository.createTask(dto);
        }
        throw new UserNotFoundError(dto.userId);
    }
    async getAllTasks() {
        return this.taskRepository.getAllTasks();
    }
    async getTaskById(id) {
        return this.taskRepository.getTaskById(id);
    }
    async updateTask(id, dto) {
        return this.taskRepository.updateTask(id, dto);
    }
    async deleteTask(id) {
        return this.taskRepository.deleteTask(id);
    }
}
