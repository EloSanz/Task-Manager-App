import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { CreateTaskDto, UpdateTaskDto } from "../task/dto/TaskDto.js";
export async function validateTask(data) {
    const taskDto = plainToClass(CreateTaskDto, data);
    return await validate(taskDto);
}
export async function validateTaskUpdate(data) {
    const taskDto = plainToClass(UpdateTaskDto, data);
    return await validate(taskDto);
}
