const { Op } = require("sequelize");
const { Meeting, User } = require("../../../config/database");
const { AppError } = require("../../../utils/errors");

const ensureUserExists = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new AppError("User not found", 404);
  }
};

const hasConflict = async ({ userId, startTime, endTime, excludeId }) => {
  const where = {
    userId,
    startTime: { [Op.lt]: endTime },
    endTime: { [Op.gt]: startTime }
  };

  if (excludeId) {
    where.id = { [Op.ne]: excludeId };
  }

  const conflict = await Meeting.findOne({ where });
  return Boolean(conflict);
};

const createMeeting = async (data) => {
  await ensureUserExists(data.userId);

  const conflict = await hasConflict({
    userId: data.userId,
    startTime: data.startTime,
    endTime: data.endTime
  });

  if (conflict) {
    throw new AppError("Time slot already booked", 400);
  }

  return Meeting.create(data);
};

const listMeetings = async (filters, pagination) => {
  const where = {};

  if (filters.userId) {
    where.userId = filters.userId;
  }

  if (filters.startDate || filters.endDate) {
    where.startTime = {};
    if (filters.startDate) {
      where.startTime[Op.gte] = filters.startDate;
    }
    if (filters.endDate) {
      where.startTime[Op.lte] = filters.endDate;
    }
  }

  const { rows, count } = await Meeting.findAndCountAll({
    where,
    order: [
      ["startTime", "ASC"],
      ["endTime", "ASC"]
    ],
    limit: pagination.limit,
    offset: pagination.offset
  });

  return {
    data: rows,
    total: count
  };
};

const getMeeting = async (id) => {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) {
    throw new AppError("Meeting not found", 404);
  }

  return meeting;
};

const updateMeeting = async (id, updates) => {
  const meeting = await getMeeting(id);
  const nextStart = updates.startTime || meeting.startTime;
  const nextEnd = updates.endTime || meeting.endTime;

  if (nextStart >= nextEnd) {
    throw new AppError("startTime must be before endTime", 400);
  }

  const conflict = await hasConflict({
    userId: meeting.userId,
    startTime: nextStart,
    endTime: nextEnd,
    excludeId: meeting.id
  });

  if (conflict) {
    throw new AppError("Time slot already booked", 400);
  }

  await meeting.update(updates);
  return meeting;
};

const deleteMeeting = async (id) => {
  const meeting = await getMeeting(id);
  await meeting.destroy();
};

module.exports = {
  createMeeting,
  listMeetings,
  getMeeting,
  updateMeeting,
  deleteMeeting
};
