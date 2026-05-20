import { Router } from "express";
import { body, param, validationResult } from "express-validator";
import * as shipmentController from "../controllers/shipmentController.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
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
router.post("/", requireAuth, body("recipientName").trim().notEmpty().withMessage("Recipient name is required").isLength({ min: 2 }).withMessage("Recipient name must be at least 2 characters"), body("recipientAddress").trim().notEmpty().withMessage("Recipient address is required").isLength({ min: 5 }).withMessage("Recipient address must be at least 5 characters"), body("details").optional({ checkFalsy: true }).trim().isLength({ min: 3 }).withMessage("Details must be at least 3 characters if provided"), handleValidationErrors, shipmentController.createShipment);
router.get("/", requireAuth, shipmentController.getMyShipments);
router.get("/track/:trackingNumber", param("trackingNumber").trim().notEmpty().withMessage("Tracking number is required").isLength({ min: 3 }).withMessage("Tracking number must be valid"), handleValidationErrors, shipmentController.trackByNumber);
router.patch("/:id/status", requireAuth, requireAdmin, param("id").trim().notEmpty().withMessage("Invalid shipment ID"), body("status").isIn(["PENDING", "IN_TRANSIT", "DELIVERED", "CANCELLED"]).withMessage("Invalid shipment status"), handleValidationErrors, shipmentController.updateStatus);
export default router;
//# sourceMappingURL=shipments.js.map