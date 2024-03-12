const { body, param } = require("express-validator");

const categoryDataValidate = [
  body("categoryName")
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage("Category name should be between 1 to 15 characters length."),
  body("desc")
    .trim()
    .isLength({ min: 1, max: 250 })
    .withMessage(
      "Description length should be between 1 to 250 characters long."
    ),
];

const categoryIdValidate = param("categoryId")
  .isMongoId()
  .withMessage("Invalid category Id.");

const categoryUpdateDataValidate = [
  body("categoryName")
    .trim()
    .isLength({ min: 1, max: 15 })
    .withMessage("Category name should be between 1 to 15 characters length."),
  body("desc")
    .trim()
    .isLength({ min: 1, max: 250 })
    .withMessage(
      "Description length should be between 1 to 250 characters long."
    ),
];

module.exports = {
  categoryDataValidate,
  categoryIdValidate,
  categoryUpdateDataValidate,
};
