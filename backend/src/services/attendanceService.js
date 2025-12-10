import Attendance from "../models/Attendance.js";

export const getTodayDate = () => {
  return new Date().toISOString().split("T")[0];
};

export const clockInService = async (user) => {
  const today = getTodayDate();

  const existing = await Attendance.findOne({
    userid: user._id,
    companyId: user.companyId,
    date: today,
  });

  if(existing && existing.clockIn) {
    throw new Error("Already clocked in");
  }

  let status = "Present";
  if(user.shift?.start) {
    const shiftStart = new Date(`${today}T${user.shift.start}:00`);
    const now = new Date();
    if (now > shiftStart) {
      status = "Late";
    }
  }

  const attendance = await Attendance.findOneAndUpdate(
    { userId: user._id, date: today, companyId: user.companyId },
    { clockIn: new Date(), status },
    { new: true, upsert: true },
  );

  return attendance;
}

export const clockOutService = async (user) => {
  const today = getTodayDate();

  const attendance = await Attendance.findOne({
    userId: user._id,
    date: today,
    companyId:  user.companyId,
  });

  if(!attendance || !attendance.clockIn) {
    throw new Error("Clock-in required before clock-out");
  }

  if(attendance.clockOut) {
    throw new Error("Already clocked out");
  }

  const now = new Date();
  const diffMs = now - attendance.clockIn;
  const totalHours = (diffMs / (1000 * 60 * 60)).toFixed(2);

  attendance.clockOut = now;
  attendance.totalHours = totalHours;

  await attendance.save();

  return attendance;
}

export const getMonthlyAttendance = async (userId, companyId, month, year) => {
  return Attendance.find({ userId, companyId, date: { $regex: `^${year}-${month}` } });
};