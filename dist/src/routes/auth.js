import { Router } from "express";
import { body, validationResult } from "express-validator";
import * as authController from "../controllers/authController.js";
import { requireAuth } from "../middleware/auth.js";
const router = Router();
// Validation middleware to handle express-validator errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => {
            if (err.type === 'field') {
                const fieldError = err;
                return `${fieldError.path}: ${fieldError.msg}`;
            }
            return err.msg;
        });
        return res.status(400).json({ error: errorMessages[0] });
    }
    next();
};
router.post("/register", body("email").trim().isEmail().withMessage("Invalid email format"), body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"), body("name").trim().notEmpty().withMessage("Name is required").isLength({ min: 2 }).withMessage("Name must be at least 2 characters"), body("address").trim().notEmpty().withMessage("Address is required").isLength({ min: 5 }).withMessage("Address must be at least 5 characters"), handleValidationErrors, authController.register);
router.post("/login", body("email").trim().isEmail().withMessage("Invalid email format"), body("password").notEmpty().withMessage("Password is required"), handleValidationErrors, authController.login);
router.get("/me", requireAuth, authController.me);
export default router;
//# sourceMappingURL=auth.js.map