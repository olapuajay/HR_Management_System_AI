import { applyLeaveService, getLeaveHistoryService, getAllLeaveRequestsService, updateLeaveStatusService } from "../services/leaveService.js";
import { getIO } from "../config/socket.js";

export const applyLeave = async (req, res) => {
  try {
    const leave = await applyLeaveService(req.user, req.body);

    const io = getIO();
    io.to(req.companyId.toString()).emit("leave:requested", {
      user: req.user.name,
      leaveId: leave._id,
      type: leave.type
    });

    res.status(201).json({ message: "Leave applied successfully", leave });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyLeaves = async (req, res) => {
  const leaves = await getLeaveHistoryService(req.user._id, req.companyId);
  res.json(leaves);
};

export const getAllLeaveRequests = async (req, res) => {
  const leaves = await getAllLeaveRequestsService(req.companyId);
  res.json(leaves);
};

export const updateLeaveStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const leave = await updateLeaveStatusService(req.params.id, req.companyId, status, req.user._id);

    const io = getIO();
    io.to(req.companyId.toString()).emit("leave:updated", {
      leaveId: leave._id,
      status
    });

    res.json({ message: `leave ${status}`, leave });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};