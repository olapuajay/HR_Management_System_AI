import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true, },

  date: { type: String, required: true, },

  clockIn: { type: Date },
  clockOut: { type: Date },

  totalHours: { type: Number, default: 0 },

  status: {
    type: String,
    enum: ["Present", "Late", "Absent"],
    default: "Present",
  }
}, { timestamps: true });

const AttendanceModel = mongoose.model("Attendance", attendanceSchema);

export default AttendanceModel;