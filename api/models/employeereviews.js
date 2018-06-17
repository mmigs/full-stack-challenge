"use strict";
module.exports = (sequelize, DataTypes) => {
  var EmployeeReviews = sequelize.define(
    "EmployeeReviews",
    {
      employeeId: DataTypes.INTEGER,
      reviewerId: DataTypes.INTEGER,
      review: DataTypes.TEXT,
      status: DataTypes.ENUM("ASSIGNED", "PENDING", "APPROVED")
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["employeeId", "reviewerId"]
        }
      ]
    }
  );
  EmployeeReviews.associate = function(models) {
    this.belongsTo(models.Employee, {
      as: "employee",
      foreignKey: "employeeId"
    });
    this.belongsTo(models.Employee, {
      as: "reviewer",
      foreignKey: "reviewerId"
    });
  };
  return EmployeeReviews;
};
