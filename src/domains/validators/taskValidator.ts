import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { CreateTaskDto, UpdateTaskDto } from "../task/dto/TaskDto";

export async function validateTask(data: Partial<CreateTaskDto>) {
    const taskDto = plainToClass(CreateTaskDto, data);
    return await validate(taskDto);
}

export async function validateTaskUpdate(data: Partial<UpdateTaskDto>) {
    const taskDto = plainToClass(UpdateTaskDto, data);
    return await validate(taskDto);
}
