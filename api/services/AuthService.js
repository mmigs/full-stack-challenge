const Employee = require("./../models").Employee;
const validator = require("validator");

const getUniqueKeyFromBody = function(body) {
  // this is so they can send in 3 options unique_key, email, or phone and it will work
  let unique_key = body.unique_key;
  if (typeof unique_key === "undefined") {
    if (typeof body.email != "undefined") {
      unique_key = body.email;
    } else if (typeof body.phone != "undefined") {
      unique_key = body.phone;
    } else {
      unique_key = null;
    }
  }

  return unique_key;
};
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createEmployee = async function(userInfo) {
  let unique_key, auth_info, err;

  auth_info = {};
  auth_info.status = "create";

  unique_key = getUniqueKeyFromBody(userInfo);
  if (!unique_key) TE("An email or phone number was not entered.");

  if (validator.isEmail(unique_key)) {
    auth_info.method = "email";
    userInfo.email = unique_key;

    [err, user] = await to(Employee.create(userInfo));
    if (err) TE("user already exists with that email");

    return user;
  } else if (validator.isMobilePhone(unique_key, "any")) {
    //checks if only phone number was sent
    auth_info.method = "phone";
    userInfo.phone = unique_key;

    [err, user] = await to(Employee.create(userInfo));
    if (err) TE("user already exists with that phone number");

    return user;
  } else {
    TE("A valid email or phone number was not entered.");
  }
};
module.exports.createEmployee = createEmployee;

const authUser = async function(employeeInfo) {
  //returns token
  let unique_key;
  let auth_info = {};
  auth_info.status = "login";
  unique_key = getUniqueKeyFromBody(employeeInfo);

  if (!unique_key) TE("Please enter an email or phone number to login");

  if (!employeeInfo.password) TE("Please enter a password to login");

  let user;
  if (validator.isEmail(unique_key)) {
    auth_info.method = "email";

    [err, user] = await to(Employee.findOne({ where: { email: unique_key } }));
    console.log(err, user, unique_key);
    if (err) TE(err.message);
  } else if (validator.isMobilePhone(unique_key, "any")) {
    //checks if only phone number was sent
    auth_info.method = "phone";

    [err, user] = await to(Employee.findOne({ where: { phone: unique_key } }));
    if (err) TE(err.message);
  } else {
    TE("A valid email or phone number was not entered");
  }

  if (!user) TE("Not registered");

  [err, user] = await to(user.comparePassword(employeeInfo.password));

  if (err) TE(err.message);

  return user;
};
module.exports.authUser = authUser;
