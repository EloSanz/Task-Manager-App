import { UserNotFoundError } from "../../../errors/customErrors.js";
import { generateToken } from "../../../middleware/auth-utils.js";
import bcrypt from "bcrypt";
export class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getTasksById(userId) {
        const userExists = await this.userRepository.existById(userId);
        if (!userExists) {
            throw new UserNotFoundError(userId);
        }
        return this.userRepository.getTasksById(userId);
    }
    async createUser(dto) {
        try {
            return await this.userRepository.createUser(dto);
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message.includes("P2002")) {
                    // Prisma error code for unique constraint violation
                    throw new Error("User already exists");
                }
            }
            throw new Error("Error creating user");
        }
    }
    async authenticateUser(username, password) {
        const user = await this.userRepository.findByUsername(username);
        if (!user)
            return { user: null, token: null };
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return { user: null, token: null };
        const token = generateToken(user.id, user.username);
        return { user, token };
    }
    async userExists(userId) {
        const user = await this.userRepository.findById(userId);
        return user !== null;
    }
}
