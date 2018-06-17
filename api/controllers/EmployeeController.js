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

  if (!body.unique_key && !body.email && !body.phone) {
    return ReE(res, "Please enter an email to register.");
  } else if (!body.password) {
    return ReE(res, "Please enter a password to register.");
  } else {
    let err, employee;

    [err, employee] = await to(authService.createEmployee(body));

    if (err) return ReE(res, err, 422);
    return ReS(
      res,
      {
        message: "Successfully created new employee.",
        employee: employee.toWeb(),
        token: employee.getJWT()
      },
      201
    );
  }
};

/**
 * Get an employee record
 */
const getById = async function(req, res) {
  let err;
  let user = req.user.toJSON();
  let employeeId = req.params.id;
  let employee;

  if (!user.admin && employeeId != user.id) {
    return ReE(res, "You don't have rights to view this employee");
  }

  employee = await Employee.findById(employeeId, {
    include: [{ model: EmployeeReviews, as: "reviews" }]
  });

  if (employee) {
    return ReS(res, employee);
  } else {
    return ReE(res, "Employee does not exist");
  }
};

/**
 * Update an employee record
 */
const updateById = async function(req, res) {
  let err;
  let user = req.user.toJSON();
  let employeeId = req.params.id;
  let employee;

  if (!user.admin) {
    return ReE(res, "You don't have rights to edit this employee");
  }

  employee = await Employee.findById(employeeId);

  if (employee) {
    /* update employee, but only allow certain fields */
    await employee.update(req.body, {
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
  let err;
  let user = req.user.toJSON();
  let employeeId = req.params.id;
  let count;

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
  updateById,
  deleteById
};
