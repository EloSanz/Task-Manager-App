var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// src/dtos/TaskDto.ts
import { Status } from "@prisma/client";
import { IsString, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
export class CreateTaskDto {
    constructor(title, description, status) {
        this.title = title;
        this.description = description;
        this.status = status;
    }
}
__decorate([
    IsString(),
    IsNotEmpty()
], CreateTaskDto.prototype, "title", void 0);
__decorate([
    IsString(),
    IsNotEmpty()
], CreateTaskDto.prototype, "description", void 0);
__decorate([
    IsEnum(Status)
], CreateTaskDto.prototype, "status", void 0);
export class UpdateTaskDto {
}
__decorate([
    IsString(),
    IsOptional()
], UpdateTaskDto.prototype, "title", void 0);
__decorate([
    IsString(),
    IsOptional()
], UpdateTaskDto.prototype, "description", void 0);
__decorate([
    IsEnum(Status),
    IsOptional()
], UpdateTaskDto.prototype, "status", void 0);
