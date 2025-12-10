import { clockInService, clockOutService, getMonthlyAttendance } from "../services/attendanceService.js";
import { getIO } from "../config/socket.js";

export const clockIn = async (req, res) => {
  try {
    const attendance = await clockInService(req.user);

    const io = getIO();
    io.to(req.companyId.toString()).emit("attendance:clockIn", {
      userId: req.user._id,
      name: req.user.name,
      time: attendance.clockIn,
    });

    res.status(200).json({ message: "Clock-in successful", attendance });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const clockOut = async (req, res) => {
  try {
    const attendance = await clockOutService(req.user);

    const io = getIO();
    io.to(req.companyId.toString()).emit("attendance:clockOut", {
      userId: req.user._id,
      name: req.user.name,
      time: attendance.clockOut,
    });

    res.status(200).json({ message: "Clock-out successful", attendance });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const monthlyAttendance = async (req, res) => {
  try {
    const { month, year } = req.query;

    const records = await getMonthlyAttendance(
      req.user._id, req.companyId, month, year
    );

    res.json(records);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};