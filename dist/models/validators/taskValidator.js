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
exports.validateTask = validateTask;
exports.validateTaskUpdate = validateTaskUpdate;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const TaskDto_1 = require("../TaskDto");
function validateTask(data) {
    return __awaiter(this, void 0, void 0, function* () {
        // Convertir el objeto plano en una instancia de la clase
        const taskDto = (0, class_transformer_1.plainToClass)(TaskDto_1.CreateTaskDto, data);
        return yield (0, class_validator_1.validate)(taskDto);
    });
}
function validateTaskUpdate(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const taskDto = (0, class_transformer_1.plainToClass)(TaskDto_1.UpdateTaskDto, data);
        return yield (0, class_validator_1.validate)(taskDto);
    });
}
