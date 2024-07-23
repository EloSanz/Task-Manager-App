import { Request, Response, NextFunction } from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    console.error(err.stack);
    res.status(500).json({ message: "Error ! !" });
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction): void {
    res.status(404).json({ message: "Resource not found" });
}
