export class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.name = "AppError";
    }
}
export class UserNotFoundError extends AppError {
    constructor(userId) {
        super(`User with ID ${userId} does not exist`, 404);
    }
}
