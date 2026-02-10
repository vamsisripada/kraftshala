const dotenv = require("dotenv");

dotenv.config();

const env = process.env.NODE_ENV || "development";

module.exports = {
  env,
  port: Number(process.env.PORT) || 3000,
  db: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    name: process.env.DB_NAME || "kraftshala_meetings",
    dialect: process.env.DB_DIALECT || "mysql",
    logging: env === "development" ? console.log : false
  },
  jwt: {
    secret: process.env.JWT_SECRET || "change_me",
    expiresIn: process.env.JWT_EXPIRES_IN || "1d"
  },
  rateLimit: {
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000,
    max: Number(process.env.RATE_LIMIT_MAX) || 120
  },
  logLevel: process.env.LOG_LEVEL || "info"
};
