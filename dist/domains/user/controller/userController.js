import prisma from "../../../prisma/prismaClient.js";
import { validateCreateUser } from "../../validators/userValidator.js";
import { UserRepository } from "../repository/user-repository.js";
import { UserService } from "../service/userService.js";
import { UserModel } from "../user.model.js";
import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
export const userRouter = Router();
dotenv.config();
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
async function loginUser(req, res) {
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1h";
    const { username, password } = req.body;
    try {
        // Can I call prisma right here?
        //const user = await service.findUnique(username);
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, {
            expiresIn: jwtExpiresIn,
        });
        return res.json({ token });
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: "Error logging in" });
    }
}
//userRouter.post("/register", validateCreateUser, async (req: Request <ver>, res: Response) => {
userRouter.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const validationErrors = await validateCreateUser({ username, password });
        if (validationErrors.length > 0) {
            return res.status(400).json({ errors: validationErrors });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const newUser = await userService.createUser({
                username,
                password: hashedPassword,
            });
            const userModel = new UserModel(newUser);
            return res.status(201).json(userModel);
        }
        catch (error) {
            console.log("Error:", error);
            return res.status(409).json({ message: "User already exists" });
        }
    }
    catch (error) {
        console.log("Error:", error);
        return res.status(500).json({ message: "Error creating user" });
    }
});
userRouter.post("/login", loginUser);
