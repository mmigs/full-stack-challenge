const express = require("express");
const router = express.Router();

const AuthController = require("./../controllers/AuthController");
const EmployeeController = require("./../controllers/EmployeeController");

const custom = require("./../middleware/custom");

const passport = require("passport");
const path = require("path");

require("./../middleware/passport")(passport);

router.get("/", function(req, res, next) {
  res.json({
    status: "success",
    message: "Employee Review API"
  });
});

router.post("/login", AuthController.login);
router.post("/employees", EmployeeController.create);
router.put(
  "/employees",
  passport.authenticate("jwt", { session: false }),
  EmployeeController.update
);
module.exports = router;
