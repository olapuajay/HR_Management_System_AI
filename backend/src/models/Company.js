import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, },
  email: { type: String, required: true, unique: true, },
  planType: { type: String, enum: ["Free", "Pro", "Enterprice"], default: "Free", },
  address: { type: String, },
  createdAt: { type: Date, default: Date.now }
});

const companyModel = mongoose.model("Company", companySchema);

export default companyModel;