import { UserNotFoundError } from "../../../errors/customErrors";
import { generateToken } from "../../../middleware/auth-utils";
import { CreateUserDto } from "../dto/userDto";
import { UserRepository } from "../repository/user-repository";
import { UserModel } from "../user.model";
import bcrypt from "bcrypt";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getTasksById(userId: number) {
    const userExists = await this.userRepository.existById(userId);
    if (!userExists) {
      throw new UserNotFoundError(userId);
    }
    return this.userRepository.getTasksById(userId);
  }

  async createUser(dto: CreateUserDto): Promise<UserModel> {
    try {
      return await this.userRepository.createUser(dto);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("P2002")) {
          // Prisma error code for unique constraint violation
          throw new Error("User already exists");
        }
      }
      throw new Error("Error creating user");
    }
  }

  async authenticateUser(
    username: string,
    password: string
  ): Promise<{ user: UserModel | null; token: string | null }> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) return { user: null, token: null };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return { user: null, token: null };

    const token = generateToken(user.id, user.username);

    return { user, token };
  }

  async userExists(userId: number): Promise<boolean> {
    const user = await this.userRepository.findById(userId);
    return user !== null;
  }
}
