require("dotenv").config();

const env = process.env.NODE_ENV || "development";
const path = require("path");

const getConfig = () => {
  const dialect = process.env.DB_DIALECT || "mysql";

  if (dialect === "sqlite") {
    return {
      dialect: "sqlite",
      storage: process.env.DB_NAME || "database.sqlite"
    };
  }

  return {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "kraftshala_meetings",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    dialect
  };
};

const base = getConfig();

module.exports = {
  development: base,
  production: base,
  test: {
    dialect: "sqlite",
    storage: ":memory:",
    logging: false
  }
};
