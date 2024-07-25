import { UserModel } from "../user.model.js";
export class UserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByUsername(username) {
        return this.prisma.user.findUnique({
            where: { username },
        });
    }
    async findById(id) {
        return this.prisma.user.findUnique({
            where: { id },
        });
    }
    async existById(id) {
        return (await this.prisma.user.count({ where: { id } })) > 0;
    }
    async createUser(data) {
        const createdUser = await this.prisma.user.create({
            data: {
                //here the id is non provided
                username: data.username,
                password: data.password,
            }, //here the id is automatically setting
        });
        return new UserModel(createdUser);
    }
    async getTasksById(userId) {
        return this.prisma.task.findMany({ where: { userId } });
    }
}
