import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string; // the property will definitely be assigned before it's used.

  @IsNotEmpty()
  @IsString()
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  username?: string; // the property will definitely be assigned before it's used.

  @IsOptional()
  @IsString()
  password?: string;
}