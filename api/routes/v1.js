const express = require("express");
const router = express.Router();

const AuthController = require("./../controllers/AuthController");
const EmployeeController = require("./../controllers/EmployeeController");
const EmployeeReviewController = require("./../controllers/EmployeeReviewController");

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

/* EMPLOYEES */
router.get(
  "/employees",
  passport.authenticate("jwt", { session: false }),
  custom.isAdmin,
  EmployeeController.getAll
);
router.post("/employees", EmployeeController.create);
router.put(
  "/employees/:id",
  passport.authenticate("jwt", { session: false }),
  custom.isAdmin,
  EmployeeController.updateById
);
router.get(
  "/employees/:id",
  passport.authenticate("jwt", { session: false }),
  custom.isAdmin,
  EmployeeController.getById
);
router.delete(
  "/employees/:id",
  passport.authenticate("jwt", { session: false }),
  custom.isAdmin,
  EmployeeController.deleteById
);

/* REVIEWS */
router.get(
  "/reviews/:id",
  passport.authenticate("jwt", { session: false }),
  custom.isAdmin,
  EmployeeReviewController.getById
);
router.post(
  "/reviews/:id",
  passport.authenticate("jwt", { session: false }),
  custom.isAdmin,
  EmployeeReviewController.updateEmployeeReview
);
router.get(
  "/reviews/employee/:id",
  passport.authenticate("jwt", { session: false }),
  custom.isAdmin,
  EmployeeReviewController.getEmployeeReviews
);
router.post(
  "/reviews/employee/:id",
  passport.authenticate("jwt", { session: false }),
  custom.isAdmin,
  EmployeeReviewController.createEmployeeReview
);
router.post(
  "/reviews/employee/:employeeId/assign/:reviewerId",
  passport.authenticate("jwt", { session: false }),
  custom.isAdmin,
  EmployeeReviewController.assignReview
);

module.exports = router;
