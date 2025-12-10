import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { tenantMiddleware } from "../middlewares/tenantMiddleware.js";

import { applyLeave, getMyLeaves, getAllLeaveRequests, updateLeaveStatus } from "../controllers/leaveController.js";

const router = express.Router();

router.use(authMiddleware);
router.use(tenantMiddleware);

router.post("/apply", roleMiddleware("employee", "hr", "admin"), applyLeave);
router.get("/my-leaves", roleMiddleware("employee", "hr", "admin"), getMyLeaves);

router.get("/requests", roleMiddleware("admin", "hr"), getAllLeaveRequests);
router.put("/update/:id", roleMiddleware("admin", "hr"), updateLeaveStatus);

export default router;