const { Sequelize } = require("sequelize");
const config = require("./env");
const UserModel = require("../modules/user/model/user");
const MeetingModel = require("../modules/meeting/model/meeting");

const isTest = config.env === "test";

let sequelize;

if (isTest) {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false
  });
} else if (config.db.dialect === "sqlite") {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: config.db.name,
    logging: config.db.logging
  });
} else {
  sequelize = new Sequelize(config.db.name, config.db.user, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect,
    logging: config.db.logging
  });
}

const User = UserModel(sequelize);
const Meeting = MeetingModel(sequelize);

User.hasMany(Meeting, { foreignKey: "userId", as: "meetings" });
Meeting.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = {
  sequelize,
  User,
  Meeting
};
