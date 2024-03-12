const { validationResult } = require("express-validator");
const { formResponse } = require("../helpers/responseHelper");
const {
  insertCategory,
  getAllCategoriesOfUser,
  updateCategoryById,
  findCategoryById,
  removeCategoryById,
} = require("../services/category.service");
const { deleteUserTasks } = require("../services/task.service");
const logger = require("../helpers/logger");

const addCategory = async (req, res) => {
  try {
    const validatedReq = validationResult(req);
    if (!validatedReq.isEmpty())
      return res.status(400).send(formResponse(null, validatedReq.array()));

    const categoryData = {
      byUser: req.user.userId,
      categoryName: req.body.categoryName,
      desc: req.body.desc,
    };
    if (req.body.colorCode)
      categoryData.colorCode = req.body.colorCode;

    const serviceRes = await insertCategory(categoryData);
    return res
      .status(201)
      .send(
        formResponse(`Created category successfully with id ${serviceRes.id}`)
      );
  } catch (error) {
    logger.error(`addCategory - ${error}`);
    return res.status(500).send(formResponse(null, "Internal error occured"));
  }
};

const getCategories = async (req, res) => {
  try {
    const categoryRes = await getAllCategoriesOfUser(req.user.userId);
    return res
      .status(200)
      .send(formResponse(formCategoryResponse(categoryRes)));
  } catch (error) {
    logger.error(`getCategories - ${error}`);
    return res.status(500).send(formResponse(null, "Internal error occured"));
  }
};

const updateCategory = async (req, res) => {
  try {
    const validatedReq = validationResult(req);
    if (!validatedReq.isEmpty())
      return res.status(400).send(formResponse(null, validatedReq.array()));

    const categoryRes = await updateCategoryById(req.params.categoryId, {
      categoryName: req.body.categoryName,
      desc: req.body.desc,
      colorCode: req.body.colorCode,
    });

    if (categoryRes === null)
      return res
        .status(404)
        .send(
          formResponse(
            null,
            `Category with id ${req.params.categoryId} not found.`
          )
        );

    return res
      .status(200)
      .send(formResponse("Updated category details successfully."));
  } catch (error) {
    logger.error(`updateCategory - ${error}`);
    return res
      .status(500)
      .send(formResponse(null, "Some internal error occured!"));
  }
};

const fetchCategoryById = async (req, res) => {
  try {
    const validatedReq = validationResult(req);
    if (!validatedReq.isEmpty())
      return res.status(400).send(formResponse(null, validatedReq.array()));

    const categoryRes = await findCategoryById(req.params.categoryId);
    if (categoryRes === null)
      return res
        .status(404)
        .send(
          formResponse(
            null,
            `Category with id ${req.params.categoryId} not found.`
          )
        );
    const categoryList = [];
    categoryList.push(categoryRes);
    return res
      .status(200)
      .send(formResponse(formCategoryResponse(categoryList)[0]));
  } catch (error) {
    logger.error(`fetchCategoryById - ${error}`);
    return res
      .status(500)
      .send(formResponse(null, "Some internal error occured!"));
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const validatedReq = validationResult(req);
    if (!validatedReq.isEmpty())
      return res.status(400).send(formResponse(null, validatedReq.array()));

    const categoryRes = await findCategoryById(req.params.categoryId);
    if (categoryRes === null)
      return res
        .status(404)
        .send(
          formResponse(
            null,
            `Category with id ${req.params.categoryId} not found.`
          )
        );

    const categoryIdLst = [];
    categoryIdLst.push(req.params.categoryId);
    await deleteUserTasks(categoryIdLst);
    await removeCategoryById(req.params.categoryId);
    return res
      .status(200)
      .send(
        formResponse(
          `Category with id ${req.params.categoryId} deleted successfully.`
        )
      );
  } catch (error) {
    logger.error(`deleteCategoryById - ${error}`);
    return res
      .status(500)
      .send(formResponse(null, "Some internal error occured!"));
  }
};

const formCategoryResponse = (categories) => {
  const categoryList = [];
  categories.forEach((r) =>
    categoryList.push({
      categoryId: r._id,
      categoryName: r.categoryName,
      colorCode: r.colorCode,
      desc: r.desc,
    })
  );
  return categoryList;
};

module.exports = {
  addCategory,
  getCategories,
  updateCategory,
  fetchCategoryById,
  deleteCategoryById,
};
