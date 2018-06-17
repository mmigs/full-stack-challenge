"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("employee_reviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employeeId: {
        type: Sequelize.INTEGER,
        references: {
          model: "employee",
          key: "id"
        }
      },
      reviewerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "employee",
          key: "id"
        }
      },
      review: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.ENUM("ASSIGNED", "PENDING", "APPROVED")
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("employee_reviews");
  }
};
