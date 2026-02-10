const bcrypt = require("bcryptjs");
const { User } = require("../../../config/database");
const { AppError } = require("../../../utils/errors");

const createUser = async (data) => {
  const existing = await User.findOne({ where: { email: data.email } });
  if (existing) {
    throw new AppError("Email already in use", 409);
  }

  const passwordHash = await bcrypt.hash(data.password, 10);
  const user = await User.create({
    name: data.name,
    email: data.email,
    passwordHash
  });

  return user;
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    throw new AppError("Invalid credentials", 401);
  }

  return user;
};

module.exports = {
  createUser,
  getUserById,
  login
};
