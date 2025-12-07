import Company from "../models/Company.js";
import User from "../models/User.js";
import { generateToken, hashPassword, comparePassword } from "../services/authService.js";
import bycrypt from "bcryptjs";

// Register company + admin account
export const registerCompany = async (req, res) => {
  try {
    const { companyName, companyEmail, adminName, adminEmail, password } = req.body;

    // Create company
    const company = await Company.create({
      name: companyName,
      email: companyEmail,
    });

    const hashedPassword = await hashPassword(password);

    // Create admin user
    const adminUser = await User.create({
      companyId: company._id,
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    const token = generateToken(adminUser);

    res.status(201).json({
      message: "Company registered successfully",
      company,
      admin: adminUser,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login users (admin, hr, employees)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user) {
      return res.status(400).json({ message: "User not found" });
    };

    const isMatch = await comparePassword(password, user.password);
    if(!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successfull",
      user,
      token,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getProfile = async (req, res) => {
  res.json({ user: req.user });
};