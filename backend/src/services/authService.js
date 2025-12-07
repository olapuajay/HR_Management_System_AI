import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};

export const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, companyId: user.companyId, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};
