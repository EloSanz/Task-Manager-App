
export class AppError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
    this.name = "AppError";
  }
}

export class UserNotFoundError extends AppError {
  constructor(userId: number) {
    super(`User with ID ${userId} does not exist`, 404);
  }
}

