"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
exports.notFoundHandler = notFoundHandler;
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ message: "Error ! !" });
}
function notFoundHandler(req, res, next) {
    res.status(404).json({ message: "Resource not found" });
}
