import User from "../models/User.js";
import { hashPassword } from "./authService.js";

export const createHRorEmployee = async (data) => {
  const { name, email, password, role, companyId } = data;

  const existing = await User.findOne({ email });
  if (existing) throw new Error("Email already in use");

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    ...data,
    password: hashedPassword,
    companyId,
    role,
  });

  return user;
};

export const getAllEmployees = async (companyId) => {
  return User.find({ companyId, role: "employee" });
};

export const getAllHRs = async (companyId) => {
  return User.find({ companyId, role: "hr" });
};

export const updateEmployee = async (id, companyId, data) => {
  return User.findOneAndUpdate({ _id: id, companyId }, data, { new: true });
};

export const deleteEmployee = async (id, companyId) => {
  return User.findOneAndDelete({ _id: id, companyId });
};