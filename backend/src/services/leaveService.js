import Leave from "../models/Leave.js";

export const applyLeaveService = async (user, data) => {
  const leave = await Leave.create({
    userId: user._id,
    companyId: user.companyId,
    ...data
  });

  return leave;
};

export const getLeaveHistoryService = async (userId, companyId) => {
  return Leave.find({ userId, companyId }).sort({ createdAt: -1 });
};

export const getAllLeaveRequestsService = async (companyId) => {
  return await Leave.find({ companyId }).populate("userId", "name email");
};

export const updateLeaveStatusService = async (leaveId, companyId, status, approverId) => {
  return Leave.findOneAndUpdate(
    { _id: leaveId, companyId },
    { status, approvedBy: approverId },
    { new: true },
  );
};