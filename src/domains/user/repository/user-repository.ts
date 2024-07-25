import { PrismaClient, User } from "@prisma/client";
import { UserModel } from "../user.model.js";

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByUsername(username: string): Promise<UserModel | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }
  async findById(id: number): Promise<UserModel | null> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
  async existById(id: number): Promise<Boolean> {
    return await this.prisma.user.count({ where: { id } }) > 0;
  }
  
  async createUser(data: {
    username: string;
    password: string;
  }): Promise<UserModel> {
    const createdUser = await this.prisma.user.create({
      data: {
        //here the id is non provided
        username: data.username,
        password: data.password,
      }, //here the id is automatically setting
    });
    return new UserModel(createdUser);
  }
}