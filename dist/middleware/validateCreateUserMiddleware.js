import { validateCreateUser } from "../domains/validators/userValidator.js";
export async function validateCredentialsUserMiddleware(req, res, next) {
    const { username, password } = req.body;
    const validationErrors = await validateCreateUser({ username, password });
    if (validationErrors.length > 0) {
        return res.status(400).json({ errors: validationErrors });
    }
    next();
}
