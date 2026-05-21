import type { Request, Response, NextFunction } from "express";
import { Router } from "express";
import { body, param, validationResult } from "express-validator";
import * as userController from "../controllers/userController.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();

const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => {
            if (err.type === 'field') {
                const fieldError = err as any;
                return `${fieldError.path}: ${fieldError.msg}`;
            }
            return err.msg;
        });
        return res.status(400).json({ error: errorMessages[0] });
    }
    next();
};

router.get("/", requireAuth, requireAdmin, userController.getAllUsers);

router.get(
    "/:id",
    requireAuth,
    requireAdmin,
    param("id").notEmpty().withMessage("User ID is required"),
    handleValidationErrors,
    userController.getUserById
);

router.patch(
    "/:id/role",
    requireAuth,
    requireAdmin,
    param("id").notEmpty().withMessage("User ID is required"),
    body("isAdmin").isBoolean().withMessage("isAdmin must be a boolean"),
    handleValidationErrors,
    userController.updateUserRole
);

export default router;
