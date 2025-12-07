import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true, },

  name: { type: String, required: true, },
  email: { type: String, required: true, unique: true, },
  password: { type: String, required: true, },

  role: { type: String, enum: ["admin", "hr", "employee"], default: "employee", },
  department: { type: String },
  position: { type: String },

  shift: {
    start: { type: String },
    end: { type: String },
  },

  salary: {
    base: { type: Number, default: 0, },
    allowances: { type: Number, default: 0, },
    deductions: { type: Number, default: 0, },
  },

  joinDate: { type: Date, default: Date.now },
  profileImage: { type: String },
}, { timeseries: true });

const userModel = mongoose.model("User", userSchema);

export default userModel;