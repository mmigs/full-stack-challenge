"use strict";
module.exports = (sequelize, DataTypes) => {
  var employee_reviews = sequelize.define(
    "employee_reviews",
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
  employee_reviews.associate = function(models) {};
  return employee_reviews;
};
