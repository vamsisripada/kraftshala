const Joi = require("joi");

const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(120).required(),
  email: Joi.string().email().max(160).required(),
  password: Joi.string().min(6).max(72).required()
});

const loginSchema = Joi.object({
  email: Joi.string().email().max(160).required(),
  password: Joi.string().min(6).max(72).required()
});

module.exports = {
  createUserSchema,
  loginSchema
};
