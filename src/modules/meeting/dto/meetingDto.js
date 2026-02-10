const Joi = require("joi");

const createMeetingSchema = Joi.object({
  userId: Joi.number().integer().positive().required(),
  title: Joi.string().min(2).max(180).required(),
  startTime: Joi.date().iso().required(),
  endTime: Joi.date().iso().required()
});

const updateMeetingSchema = Joi.object({
  title: Joi.string().min(2).max(180).optional(),
  startTime: Joi.date().iso().optional(),
  endTime: Joi.date().iso().optional()
});

const listMeetingSchema = Joi.object({
  userId: Joi.number().integer().positive().optional(),
  startDate: Joi.date().iso().optional(),
  endDate: Joi.date().iso().optional(),
  page: Joi.number().integer().positive().optional(),
  pageSize: Joi.number().integer().positive().optional()
});

module.exports = {
  createMeetingSchema,
  updateMeetingSchema,
  listMeetingSchema
};
