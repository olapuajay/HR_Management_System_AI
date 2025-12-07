import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";
import { tenantMiddleware } from "../middlewares/tenantMiddleware.js";

import {
  createHR,
  createEmployee,
  updateEmployeeDetails,
  deleteEmployeeAccount,
  getEmployees,
  getHRs,
} from "../controllers/adminController.js";

const router = express.Router();

router.use(authMiddleware);
router.use(tenantMiddleware);

// Admin only
router.post("/create-hr", roleMiddleware("admin"), createHR);

// Admin + HR
router.post("/create-employee", roleMiddleware("admin", "hr"), createEmployee);
router.get("/employees", roleMiddleware("admin", "hr"), getEmployees);
router.get("/hrs", roleMiddleware("admin"), getHRs);

router.put("/employee/:id", roleMiddleware("admin", "hr"), updateEmployeeDetails);
router.delete("/employee/:id", roleMiddleware("admin", "hr"), deleteEmployeeAccount);

export default router;