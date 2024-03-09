const express = require("express");
const {
  categoryDataValidate,
  categoryIdValidate,
  categoryUpdateDataValidate,
} = require("../controllers/validationSchemes/categoryValidator");
const {
  addCategory,
  getCategories,
  updateCategory,
  fetchCategoryById,
  deleteCategoryById,
} = require("../controllers/category.controller");
const { authorizeUser } = require("../controllers/middlewares/authMiddleware");

const categoryRoutes = () => {
  const categoryRouter = express.Router();

  categoryRouter.post("/", authorizeUser, categoryDataValidate, addCategory);
  categoryRouter.get("/", authorizeUser, getCategories);
  categoryRouter.put(
    "/:categoryId",
    authorizeUser,
    categoryUpdateDataValidate,
    categoryIdValidate,
    updateCategory
  );
  categoryRouter.get(
    "/:categoryId",
    authorizeUser,
    categoryIdValidate,
    fetchCategoryById
  );
  categoryRouter.delete(
    "/:categoryId",
    authorizeUser,
    categoryIdValidate,
    deleteCategoryById
  );

  return categoryRouter;
};

module.exports = categoryRoutes;
