const { body } = require("express-validator");

const userDataValidate = [
  body("name")
    .isLength({ min: 1, max: 30 })
    .withMessage("Name should be between 1 to 30 characters length."),
  body("email").isEmail().withMessage("Not a valid email address"),
  body("username")
    .isLength({ min: 5, max: 20 })
    .withMessage("Username should be of length 5 to 20 characters."),
  body("password")
    .isLength({ min: 8, max: 15 })
    .withMessage("Password must be between 8 to 15 characters long only."),
];

const validatePassword = [
  body("password")
    .isLength({ min: 8, max: 15 })
    .withMessage("Password must be between 8 to 15 characters long only."),
];

const validateUpdateData = [
  body("name")
    .optional()
    .isLength({ min: 1, max: 30 })
    .withMessage("Name should be between 1 to 30 characters length."),
  body("email").optional().isEmail().withMessage("Not a valid email address"),
  body("username")
    .optional()
    .isLength({ min: 5, max: 20 })
    .withMessage("Username should be of length 5 to 20 characters."),
];

const validateLoginData = [
  body("username")
    .isLength({ min: 8, max: 15 })
    .withMessage("Password must be between 8 to 15 characters long only."),
  body("username")
    .isLength({ min: 5, max: 20 })
    .withMessage("Username should be of length 5 to 20 characters."),
];

module.exports = {
  userDataValidate,
  validatePassword,
  validateUpdateData,
  validateLoginData,
};
