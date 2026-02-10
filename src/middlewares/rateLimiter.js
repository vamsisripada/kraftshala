const rateLimit = require("express-rate-limit");
const config = require("../config/env");

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = limiter;
