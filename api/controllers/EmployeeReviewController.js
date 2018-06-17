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

  if (!user.admin) {
    return ReE(res, "You don't have rights to view this review");
  }

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

module.exports = {
  getById
};
