"use strict";
const bcrypt_p = require("bcrypt-promise");
const jwt = require("jsonwebtoken");
const { createPasswordHash } = require("../utils/utils");

module.exports = (sequelize, DataTypes) => {
  var Employee = sequelize.define(
    "Employee",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: { isEmail: { msg: "Phone number invalid." } }
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: { args: [7, 20], msg: "Phone number invalid, too short." },
          isNumeric: { msg: "not a valid phone number." }
        }
      },
      password: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
      startDate: DataTypes.DATE
    },
    {}
  );
  Employee.associate = function(models) {
    // associations can be defined here
    this.hasMany(models.EmployeeReviews, {
      foreignKey: "employeeId",
      as: "reviews"
    });
    this.hasMany(models.EmployeeReviews, {
      foreignKey: "reviewerId",
      as: "reviewsWritten"
    });
  };

  Employee.beforeSave(async (user, options) => {
    let err;
    if (user.changed("password")) {
      let hash = await createPasswordHash(user.password);
      user.password = hash;
    }
  });

  Employee.prototype.comparePassword = async function(pw) {
    let err, pass;
    if (!this.password) TE("password not set");

    [err, pass] = await to(bcrypt_p.compare(pw, this.password));
    if (err) TE(err);

    if (!pass) TE("invalid password");

    return this;
  };

  Employee.prototype.getJWT = function() {
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    return jwt.sign({ user_id: this.id }, CONFIG.jwt_encryption, {
      expiresIn: expiration_time
    });
  };

  Employee.prototype.toJSON = function(pw) {
    var values = Object.assign({}, this.get());
    /* omit fields from return */
    delete values.password;
    return values;
  };

  Employee.prototype.toWeb = function(pw) {
    return this.toJSON();
  };

  return Employee;
};
