var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
export class CreateUserDto {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}
__decorate([
    IsString(),
    IsNotEmpty()
], CreateUserDto.prototype, "username", void 0);
__decorate([
    IsNotEmpty(),
    IsString()
], CreateUserDto.prototype, "password", void 0);
export class UpdateUserDto {
}
__decorate([
    IsString(),
    IsOptional()
], UpdateUserDto.prototype, "username", void 0);
__decorate([
    IsOptional(),
    IsString()
], UpdateUserDto.prototype, "password", void 0);
