import { plainToClass } from "class-transformer";
import { CreateUserDto } from "../user/dto/userDto.js";
import { validate } from "class-validator";

export async function validateCreateUser(data: Partial <CreateUserDto>) {
  const userDto = plainToClass(CreateUserDto, data);
  return await validate(userDto);
}