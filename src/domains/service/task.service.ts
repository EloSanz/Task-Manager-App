import { TaskRepository } from "../repository/task.repository.js";
import { CreateTaskDto, UpdateTaskDto } from "../task/dto/TaskDto.js";


export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getAllTasks() {
    return this.taskRepository.getAllTasks();
  }

  async getTaskById(id: string) {
    return this.taskRepository.getTaskById(id);
  }

  async createTask(dto: CreateTaskDto) {
    return this.taskRepository.createTask(dto);
  }

  async updateTask(id: string, dto: UpdateTaskDto) {
    return this.taskRepository.updateTask(id, dto);
  }

  async deleteTask(id: string) {
    return this.taskRepository.deleteTask(id);
  }
}
