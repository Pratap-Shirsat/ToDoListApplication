const express = require("express");
const {
  categoryDataValidate,
  categoryIdValidate,
} = require("../controllers/validationSchemes/categoryValidator");
const {
  addCategory,
  getCategories,
  updateCategory,
  fetchCategoryById,
  deleteCategoryById,
} = require("../controllers/category.controller");

const categoryRoutes = () => {
  const categoryRouter = express.Router();

  categoryRouter.post("/", categoryDataValidate, addCategory);
  categoryRouter.get("/", getCategories);
  categoryRouter.put(
    "/:categoryId",
    categoryDataValidate,
    categoryIdValidate,
    updateCategory
  );
  categoryRouter.get("/:categoryId", categoryIdValidate, fetchCategoryById);
  categoryRouter.delete("/:categoryId", categoryIdValidate, deleteCategoryById);

  return categoryRouter;
};

module.exports = categoryRoutes;
