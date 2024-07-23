export function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ message: "Error ! !" });
}
export function notFoundHandler(req, res, next) {
    res.status(404).json({ message: "Resource not found" });
}
