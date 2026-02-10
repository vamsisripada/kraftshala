const app = require("./app");
const config = require("./config/env");
const { sequelize } = require("./config/database");
const logger = require("./utils/logger");

const start = async () => {
  try {
    await sequelize.authenticate();
    app.listen(config.port, () => {
      logger.info(`Server running on port ${config.port}`);
    });
  } catch (error) {
    logger.error("Failed to start server", { message: error.message, stack: error.stack });
    process.exit(1);
  }
};

start();
