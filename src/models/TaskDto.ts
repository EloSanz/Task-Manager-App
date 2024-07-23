// src/dtos/TaskDto.ts
import { Status } from "./Status.js";
import { IsString, IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(Status)
    status: Status;
    
    constructor(title: string, description: string, status: Status) {
        this.title = title;
        this.description = description;
        this.status = status;
    }
}

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(Status)
    @IsOptional()
    status?: Status;
}
