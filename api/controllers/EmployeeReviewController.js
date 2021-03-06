const Employee = require("../models").Employee;
const EmployeeReviews = require("../models").EmployeeReviews;
const validator = require("validator");
const Sequelize = require("sequelize");

/**
 * Get an employee record
 */
const getById = async function(req, res) {
  let err;
  let user = req.user.toJSON();
  let reviewId = req.params.id;
  let review;

  review = await EmployeeReviews.findById(reviewId, {
    include: [
      { model: Employee, as: "employee" },
      { model: Employee, as: "reviewer" }
    ]
  });

  if (review) {
    return ReS(res, review);
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

/**
 * Create an employee review
 */
const createEmployeeReview = async function(req, res) {
  let user = req.user.toJSON();
  let employeeId = req.params.id;
  let reviewData = req.body;
  let review;

  reviewData.employeeId = employeeId;

  /* if no reviewer id, use logged in user */
  if (!reviewData.reviewerId) {
    reviewData.reviewerId = user.id;
  }

  if (!reviewData.review || validator.isEmpty(reviewData.review)) {
    return ReE(res, "Review text must not be empty");
  } else if (reviewData.reviewerId === reviewData.employeeId) {
    return ReE(res, "Employee can not review themself");
  }

  return await EmployeeReviews.create(reviewData)
    .then(data => {
      return ReS(res, data, 201);
    })
    .catch(err => {
      if (err.type === Sequelize.SequelizeUniqueConstraintError) {
        return ReE(
          res,
          "Reviewer can only provide an employee review once",
          422
        );
      } else {
        return ReE(res, err, 422);
      }
    });
};

/**
 * Update an employee review
 */
const updateEmployeeReview = async function(req, res) {
  let reviewId = req.params.id;
  let reviewData = req.body;
  let review;

  if (!reviewData.review || validator.isEmpty(reviewData.review)) {
    return ReE(res, "Review text must not be empty");
  }

  review = await EmployeeReviews.findById(reviewId, {
    include: [
      { model: Employee, as: "employee" },
      { model: Employee, as: "reviewer" }
    ]
  });

  if (review) {
    /* only allow updating the review text itself */
    await review.update(reviewData, {
      fields: ["review"]
    });
    return ReS(res, {
      message: "Update successful",
      review: review.toJSON()
    });
  } else {
    return ReE(res, "Review does not exist");
  }
};

/**
 * Create an employee review
 */
const assignReview = async function(req, res) {
  let user = req.user.toJSON();
  let employeeId = req.params.employeeId;
  let reviewerId = req.params.reviewerId;
  let reviewData = {
    employeeId,
    reviewerId,
    status: "ASSIGNED"
  };

  if (reviewData.reviewerId === reviewData.employeeId) {
    return ReE(res, "Employee can not review themself");
  }

  return await EmployeeReviews.create(reviewData)
    .then(data => {
      return ReS(res, data, 201);
    })
    .catch(err => {
      if (err.type === Sequelize.SequelizeUniqueConstraintError) {
        return ReE(
          res,
          "Reviewer can only provide an employee review once",
          422
        );
      } else {
        return ReE(res, err, 422);
      }
    });
};

/**
 * Create an employee review
 */
const getAssignedReviews = async function(req, res) {
  let user = req.user.toJSON();
  let reviewerId = user.id;
  let assigned;

  assigned = await EmployeeReviews.findAll({
    where: {
      reviewerId: reviewerId,
      status: "ASSIGNED"
    },
    include: [
      { model: Employee, as: "employee" },
      { model: Employee, as: "reviewer" }
    ]
  });

  return ReS(res, assigned);
};

/**
 * Provide an employee review
 */
const provideReview = async function(req, res) {
  let user = req.user.toJSON();
  let reviewId = req.params.id;
  let reviewData = req.body;
  let review;

  reviewData.reviewerId = user.id;
  if (!reviewData.review || validator.isEmpty(reviewData.review)) {
    return ReE(res, "Review text must not be empty");
  }

  review = await EmployeeReviews.findById(reviewId, {
    include: [
      { model: Employee, as: "employee" },
      { model: Employee, as: "reviewer" }
    ]
  });

  if (!review) {
    return ReE(res, "Review does not exist");
  } else if (review.reviewerId !== user.id) {
    return ReE(res, "Employee does not have permission to provide review");
  } else if (review.status === "APPROVED") {
    return ReE(res, "Employee does not have permission to edit this review");
  }

  /* only allow updating the review text itself, update status from ASSIGNED */
  reviewData.status = "PENDING";
  await review.update(reviewData, {
    fields: ["review", "status"]
  });

  return ReS(res, {
    message: "Update successful",
    review: review.toJSON()
  });
};

module.exports = {
  getById,
  getEmployeeReviews,
  createEmployeeReview,
  updateEmployeeReview,
  assignReview,
  getAssignedReviews,
  provideReview
};
