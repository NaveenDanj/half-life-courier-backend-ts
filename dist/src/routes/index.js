import { Router } from "express";
import authRoutes from "./auth.js";
import shipmentRoutes from "./shipments.js";
const router = Router();
router.use("/auth", authRoutes);
router.use("/shipments", shipmentRoutes);
export default router;
//# sourceMappingURL=index.js.map