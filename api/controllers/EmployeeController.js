const validator = require("validator");
const Employee = require("../models").Employee;
const EmployeeReviews = require("../models").EmployeeReviews;
const authService = require("./../services/AuthService");

/**
 * Create new employee
 * @param {*} req
 * @param {*} res
 */
const create = async function(req, res) {
  const body = req.body;

  if (!body.unique_key && !validator.isEmail(body.email)) {
    return ReE(res, "Please enter an email to register.");
  } else if (!body.password) {
    return ReE(res, "Please enter a password to register.");
  } else if (!validator.isMobilePhone(body.phone, "any")) {
    return ReE(res, "Invalid phone provided");
  } else if (!validator.toDate(body.startDate)) {
    return ReE(res, "Start date must be in format YYYY-MM-DD");
  } else {
    let err, employee;

    [err, employee] = await to(authService.createEmployee(body));

    if (err) return ReE(res, err, 422);
    return ReS(res, employee.toJSON(), 201);
  }
};

/**
 * Get an employee record
 */
const getById = async function(req, res) {
  let employeeId = req.params.id;
  let employee;

  employee = await Employee.findById(employeeId, {
    include: [
      {
        model: EmployeeReviews,
        as: "reviews",
        include: [
          { model: Employee, as: "employee" },
          { model: Employee, as: "reviewer" }
        ]
      }
    ]
  });

  if (employee) {
    return ReS(res, employee);
  } else {
    return ReE(res, "Employee does not exist");
  }
};

const getAll = async function(req, res) {
  return ReS(res, { employees: await Employee.findAll() });
};

/**
 * Update an employee record
 */
const updateById = async function(req, res) {
  let user = req.user.toJSON();
  let employeeId = req.params.id;
  let employee;
  let employeeData = req.body;

  if (!user.admin) {
    return ReE(res, "You don't have rights to edit this employee");
  }

  if (!validator.isEmail(employeeData.email)) {
    return ReE(res, "Invalid email provided");
  } else if (!validator.isMobilePhone(employeeData.phone, "any")) {
    return ReE(res, "Invalid phone provided");
  }

  employee = await Employee.findById(employeeId);

  if (employee) {
    /* update employee, but only allow certain fields */
    await employee.update(employeeData, {
      fields: ["firstName", "lastName", "email", "phone", "password"]
    });
    return ReS(res, {
      message: "Update successful",
      employee: employee.toJSON()
    });
  } else {
    return ReE(res, "Employee does not exist");
  }
};

/**
 * Delete an employee
 */
const deleteById = async function(req, res) {
  let user = req.user.toJSON();
  let employeeId = req.params.id;

  if (!user.admin) {
    return ReE(res, "You don't have rights to edit this employee");
  } else if (employeeId === user.id) {
    return ReE(res, "Can't delete own user");
  }

  Employee.destroy({
    where: {
      id: employeeId
    }
  })
    .then(() => {
      return ReS(res);
    })
    .catch(() => {
      return ReE(res, "Unable to delete employee");
    });
};

module.exports = {
  create,
  getById,
  getAll,
  updateById,
  deleteById
};
