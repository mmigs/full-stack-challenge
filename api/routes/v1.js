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
  "/employees/:id",
  passport.authenticate("jwt", { session: false }),
  EmployeeController.updateById
);
router.get(
  "/employees/:id",
  passport.authenticate("jwt", { session: false }),
  EmployeeController.getById
);
router.delete(
  "/employees/:id",
  passport.authenticate("jwt", { session: false }),
  EmployeeController.deleteById
);
module.exports = router;
