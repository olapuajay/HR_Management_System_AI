import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { tenantMiddleware } from "../middlewares/tenantMiddleware.js";

import { clockIn, clockOut, monthlyAttendance } from "../controllers/attendanceController.js";

const router = express.Router();

router.use(authMiddleware);
router.use(tenantMiddleware);

router.post("/clock-in", clockIn);
router.post("/clock-out", clockOut);

router.get("/monthly", monthlyAttendance);

export default router;