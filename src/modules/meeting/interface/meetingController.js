const asyncHandler = require("../../../utils/asyncHandler");
const { AppError } = require("../../../utils/errors");
const { getPagination } = require("../../../utils/pagination");
const {
  createMeetingSchema,
  updateMeetingSchema,
  listMeetingSchema
} = require("../dto/meetingDto");
const meetingService = require("../service/meetingService");

const toMeetingDto = (meeting) => ({
  id: meeting.id,
  userId: meeting.userId,
  title: meeting.title,
  startTime: meeting.startTime,
  endTime: meeting.endTime,
  createdAt: meeting.createdAt,
  updatedAt: meeting.updatedAt
});

const createMeeting = asyncHandler(async (req, res) => {
  const { error, value } = createMeetingSchema.validate(req.body, { abortEarly: false });
  if (error) {
    throw new AppError("Validation failed", 400, error.details.map((d) => d.message));
  }

  if (value.startTime >= value.endTime) {
    throw new AppError("startTime must be before endTime", 400);
  }

  const meeting = await meetingService.createMeeting(value);
  res.status(201).json(toMeetingDto(meeting));
});

const listMeetings = asyncHandler(async (req, res) => {
  const { error, value } = listMeetingSchema.validate(req.query, { abortEarly: false });
  if (error) {
    throw new AppError("Validation failed", 400, error.details.map((d) => d.message));
  }

  const pagination = getPagination(value);
  const result = await meetingService.listMeetings(value, pagination);

  res.json({
    data: result.data.map(toMeetingDto),
    pagination: {
      page: pagination.page,
      pageSize: pagination.pageSize,
      total: result.total
    }
  });
});

const getMeeting = asyncHandler(async (req, res) => {
  const meeting = await meetingService.getMeeting(req.params.id);
  res.json(toMeetingDto(meeting));
});

const updateMeeting = asyncHandler(async (req, res) => {
  const { error, value } = updateMeetingSchema.validate(req.body, { abortEarly: false });
  if (error) {
    throw new AppError("Validation failed", 400, error.details.map((d) => d.message));
  }

  const meeting = await meetingService.updateMeeting(req.params.id, value);
  res.json(toMeetingDto(meeting));
});

const deleteMeeting = asyncHandler(async (req, res) => {
  await meetingService.deleteMeeting(req.params.id);
  res.status(204).send();
});

module.exports = {
  createMeeting,
  listMeetings,
  getMeeting,
  updateMeeting,
  deleteMeeting
};
