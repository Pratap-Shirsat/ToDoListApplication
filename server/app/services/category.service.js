const categoryModel = require("../models/category.model");

const insertCategory = async (category) => await categoryModel.create(category);

const getAllCategoriesOfUser = async (userId) =>
  categoryModel.find({ byUser: userId }).exec();

const findCategoryById = async (categoryId) =>
  categoryModel.findById(categoryId).exec();

const updateCategoryById = async (categoryId, category) =>
  categoryModel.findByIdAndUpdate(categoryId, category).exec();

const removeCategoryById = async (categoryId) =>
  categoryModel.findByIdAndDelete(categoryId).exec();

module.exports = {
  insertCategory,
  getAllCategoriesOfUser,
  findCategoryById,
  updateCategoryById,
  removeCategoryById,
};
