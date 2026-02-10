const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(120),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(160),
        allowNull: false,
        unique: true
      },
      passwordHash: {
        type: DataTypes.STRING(120),
        allowNull: false
      }
    },
    {
      tableName: "users",
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );

  return User;
};
