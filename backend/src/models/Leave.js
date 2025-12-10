import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    type: {
      type: String,
      enum: [
        "Sick Leave",
        "Casual Leave",
        "Annual Leave",
        "Maternity Leave",
        "Unpaid Leave",
      ],
      required: true,
    },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },

    reason: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      defualt: "Pending",
    },

    appliedAt: { type: Date, default: Date.now },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      dafault: null,
    },
  },
  { timestamps: true }
);

const LeaveModel = mongoose.model("Leave", leaveSchema);

export default LeaveModel;
