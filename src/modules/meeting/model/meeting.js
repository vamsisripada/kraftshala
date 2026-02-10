const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Meeting = sequelize.define(
    "Meeting",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING(180),
        allowNull: false
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      tableName: "meetings",
      timestamps: true,
      paranoid: true,
      underscored: true,
      indexes: [
        { fields: ["user_id", "start_time"] },
        { fields: ["user_id", "end_time"] }
      ]
    }
  );

  return Meeting;
};
