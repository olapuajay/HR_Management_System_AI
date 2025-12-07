import express from "express";
import {
  registerCompany,
  login,
  getProfile,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerCompany);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);

export default router;
