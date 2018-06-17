const Employee = require("./../models").Employee;

let isAdmin = async function(req, res, next) {
  let err;
  let user = req.user.toJSON();

  if (!user.admin) {
    return ReE(res, "User does not have rights to perform this action");
  }
  next();
};

module.exports = {
  isAdmin
};
