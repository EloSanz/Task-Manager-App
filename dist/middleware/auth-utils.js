import jwt from "jsonwebtoken";
export function generateToken(userId, username) {
    const jwtSecret = process.env.JWT_SECRET;
    const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "1h";
    return jwt.sign({ id: userId, username: username }, jwtSecret, {
        expiresIn: jwtExpiresIn,
    });
}
