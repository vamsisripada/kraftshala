const jwt = require("jsonwebtoken");
const asyncHandler = require("../../../utils/asyncHandler");
const { createUserSchema, loginSchema } = require("../dto/userDto");
const userService = require("../service/userService");
const config = require("../../../config/env");
const { AppError } = require("../../../utils/errors");

const toPublicUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

const createUser = asyncHandler(async (req, res) => {
  const { error, value } = createUserSchema.validate(req.body, { abortEarly: false });
  if (error) {
    throw new AppError("Validation failed", 400, error.details.map((d) => d.message));
  }

  const user = await userService.createUser(value);
  res.status(201).json(toPublicUser(user));
});

const getUser = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json(toPublicUser(user));
});

const login = asyncHandler(async (req, res) => {
  const { error, value } = loginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    throw new AppError("Validation failed", 400, error.details.map((d) => d.message));
  }

  const user = await userService.login(value.email, value.password);
  const token = jwt.sign(
    { userId: user.id, email: user.email },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn }
  );

  res.json({ token });
});

module.exports = {
  createUser,
  getUser,
  login
};
