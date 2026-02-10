const jwt = require("jsonwebtoken");
const config = require("../config/env");
const { AppError } = require("../utils/errors");

const auth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return next(new AppError("Unauthorized", 401));
  }

  try {
    const payload = jwt.verify(token, config.jwt.secret);
    req.user = payload;
    return next();
  } catch (error) {
    return next(new AppError("Invalid token", 401));
  }
};

module.exports = auth;
