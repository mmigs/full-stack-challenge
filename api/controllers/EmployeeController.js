const Employee = require("../models").Employee;
const EmployeeReviews = require("../models").EmployeeReviews;
const authService = require("./../services/AuthService");

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
  return ReS(res, employee);
};

const updateById = async function(req, res) {
  let err;
  let user = req.user.toJSON();
  let employeeId = req.params.id;
  let employee;

  if (!user.admin) {
    return ReE(res, "You don't have rights to edit this employee");
  }

  employee = await Employee.findById(employeeId);

  /* update employee, but only allow certain fields */
  await employee.update(req.body, {
    fields: ["firstName", "lastName", "email", "phone", "password"]
  });
  return ReS(res, {
    message: "Updated Sucessful",
    employee: employee.toJSON()
  });
};

const remove = async function(req, res) {
  let user, err;
  user = req.user;

  [err, user] = await to(user.destroy());
  if (err) return ReE(res, "error occured trying to delete user");

  return ReS(res, { message: "Deleted User" }, 204);
};

module.exports = {
  create,
  getById,
  updateById,
  remove
};
