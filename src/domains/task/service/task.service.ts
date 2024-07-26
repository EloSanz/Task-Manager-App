import { TaskRepository } from "../repository/task.repository";
import { CreateTaskDto, UpdateTaskDto } from "../dto/TaskDto";
import { UserRepository } from "../../user/repository/user-repository";
import { UserNotFoundError } from "../../../errors/customErrors";

export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository
  ) {}

 async createTask(dto: CreateTaskDto) {
    if (await this.userRepository.existById(dto.userId)) {
      return this.taskRepository.createTask(dto);
    }
    throw new UserNotFoundError(dto.userId);
  }

  async getAllTasks() {
    return this.taskRepository.getAllTasks();
  }

  async getTaskById(id: number) {
    return this.taskRepository.getTaskById(id);
  }

  async updateTask(id: number, dto: UpdateTaskDto) {
    return this.taskRepository.updateTask(id, dto);
  }

  async deleteTask(id: number) {
    return this.taskRepository.deleteTask(id);
  }
}
