import { PrismaClient, User } from "@prisma/client";
import { UserModel } from "../user.model.js";

export class UserRepository{

    async findByUsername(username: string): Promise <UserModel | null> {
            return this.prisma.user.findUnique({
              where: { username },
            });
    }

    constructor(private readonly prisma: PrismaClient){}

    async createUser(data: {username: string; password: string}): Promise<UserModel>{
        
        const createdUser = await this.prisma.user.create({
            data: {
                //here the id is non provided
                username: data.username,
                password: data.password
            }//here the id is automatically setting
        });
        return new UserModel(createdUser);
    }

}