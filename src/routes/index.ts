import { Router } from "express";
import authRoutes from "./auth.js";
import shipmentRoutes from "./shipments.js";
import userRoutes from "./users.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/shipments", shipmentRoutes);
router.use("/users", userRoutes);

export default router;
