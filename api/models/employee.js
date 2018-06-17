"use strict";
module.exports = (sequelize, DataTypes) => {
  var employee = sequelize.define(
    "employee",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
      startDate: DataTypes.DATE
    },
    {}
  );
  employee.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.employee_reviews, {
      foreignKey: "employeeId",
      as: "reviews"
    });
    this.hasMany(models.employee_reviews, {
      foreignKey: "reviewerId",
      as: "reviewsWritten"
    });
  };
  return employee;
};
