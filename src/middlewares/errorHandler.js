const logger = require("../utils/logger");
const { AppError } = require("../utils/errors");

const errorHandler = (err, req, res, next) => {
  const isAppError = err instanceof AppError;
  const statusCode = isAppError ? err.statusCode : 500;
  const message = isAppError ? err.message : "Internal server error";

  if (!isAppError) {
    logger.error("Unhandled error", { message: err.message, stack: err.stack });
  }

  res.status(statusCode).json({
    message,
    details: isAppError ? err.details : undefined
  });
};

module.exports = errorHandler;
