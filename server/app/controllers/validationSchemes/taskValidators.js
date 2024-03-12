const { body, param, query } = require("express-validator");

const allowedStatus = ["Pending", "InProgress", "Completed"];

const validateTaskStatus = (value) => {
  if (!allowedStatus.includes(value)) {
    throw new Error("Status can be either Pending, InProgress or Completed.");
  }
  return true;
};

const taskDataValidate = [
  body("taskInfo")
    .trim()
    .isLength({ min: 1, max: 800 })
    .withMessage("Task information should be of length 1 to 800 characters."),
  body("dueDate").optional().toDate(),
  body("categoryId").isMongoId().withMessage("Category Id is Invalid!"),
];

const validateTaskId = param("taskId")
  .isMongoId()
  .withMessage("TaskId is invalid!");

const validateFilterData = [
  query("categoryId").optional().isMongoId().withMessage("Invalid categoryId"),
  query("taskStatus").optional().custom(validateTaskStatus),
  query("searchString")
    .optional()
    .notEmpty()
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage("Search string should be between 1 to 15 characters only"),
];

const taskUpdateDataValidate = [
  body("taskInfo")
    .trim()
    .isLength({ min: 1, max: 800 })
    .withMessage("Task information should be of length 1 to 800 characters."),
  body("dueDate").toDate(),
  body("categoryId").isMongoId().withMessage("Invalid categoryId"),
  body("taskStatus").custom(validateTaskStatus),
];

module.exports = {
  taskDataValidate,
  validateTaskId,
  validateFilterData,
  taskUpdateDataValidate,
};
