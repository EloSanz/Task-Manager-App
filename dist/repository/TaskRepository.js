"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const TaskModel_1 = require("../models/TaskModel");
class TaskRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.task.findMany();
        });
    }
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.task.findUnique({ where: { id } });
        });
    }
    createTask(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdTask = yield this.prisma.task.create({
                data: {
                    title: data.title,
                    description: data.description,
                    status: data.status, // `status` debe ser del tipo `Status` importado
                },
            });
            return new TaskModel_1.TaskModel(createdTask);
        });
    }
    updateTask(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.task.update({ where: { id }, data });
        });
    }
    deleteTask(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.prisma.task.delete({ where: { id } });
        });
    }
}
exports.TaskRepository = TaskRepository;
