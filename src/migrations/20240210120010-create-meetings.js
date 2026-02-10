"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("meetings", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: "users",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      title: {
        type: Sequelize.STRING(180),
        allowNull: false
      },
      start_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_time: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    await queryInterface.addIndex("meetings", ["user_id", "start_time"]);
    await queryInterface.addIndex("meetings", ["user_id", "end_time"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("meetings");
  }
};
