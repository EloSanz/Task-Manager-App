import { UserModel } from "../user.model.js";
export class UserRepository {
    async findByUsername(username) {
        return this.prisma.user.findUnique({
            where: { username },
        });
    }
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(data) {
        const createdUser = await this.prisma.user.create({
            data: {
                //here the id is non provided
                username: data.username,
                password: data.password
            } //here the id is automatically setting
        });
        return new UserModel(createdUser);
    }
}
