const Employee = require("../models").Employee;
const EmployeeReviews = require("../models").EmployeeReviews;
const authService = require("./../services/AuthService");

/**
 * Get an employee record
 */
const getById = async function(req, res) {
  let err;
  let user = req.user.toJSON();
  let reviewId = req.params.id;
  let employee;

  employee = await EmployeeReviews.findById(reviewId, {
    include: [
      { model: Employee, as: "employee" },
      { model: Employee, as: "reviewer" }
    ]
  });

  if (employee) {
    return ReS(res, employee);
  } else {
    return ReE(res, "Review does not exist");
  }
};

/**
 * Get an employee record
 */
const getEmployeeReviews = async function(req, res) {
  let employeeId = req.params.id;
  let reviews;

  reviews = await EmployeeReviews.findAll({
    where: {
      employeeId: employeeId
    },
    include: [
      { model: Employee, as: "employee" },
      { model: Employee, as: "reviewer" }
    ]
  });

  if (reviews) {
    return ReS(res, { reviews });
  } else {
    return ReE(res, "Review does not exist");
  }
};

module.exports = {
  getById,
  getEmployeeReviews
};
