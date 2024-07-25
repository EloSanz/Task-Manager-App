
import { Status } from "@prisma/client";
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsInt,
} from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Status)
  status: Status;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  constructor(
    title: string,
    description: string,
    status: Status,
    userId: number
  ) {
    this.title = title;
    this.description = description;
    this.status = status;
    this.userId = userId; // Added
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

  @IsInt()
  @IsOptional()
  userId?: number; // Added
}
