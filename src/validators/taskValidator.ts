import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { CreateTaskDto, UpdateTaskDto } from "../models/TaskDto.js";

export async function validateTask(data: Partial<CreateTaskDto>) {
    // Convertir el objeto plano en una instancia de la clase
    const taskDto = plainToClass(CreateTaskDto, data);
    return await validate(taskDto);
}

export async function validateTaskUpdate(data: Partial<UpdateTaskDto>) {
    const taskDto = plainToClass(UpdateTaskDto, data);
    return await validate(taskDto);
}
