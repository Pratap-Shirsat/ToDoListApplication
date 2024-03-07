const { validationResult } = require("express-validator");
const { formResponse } = require("../helpers/responseHelper");
const {
  insertCategory,
  getAllCategories,
  updateCategoryById,
  findCategoryById,
  removeCategoryById,
} = require("../services/category.service");

const addCategory = async (req, res) => {
  try {
    const validatedReq = validationResult(req);
    if (!validatedReq.isEmpty())
      return res.status(400).send(formResponse(null, validatedReq.array()));

    const serviceRes = await insertCategory(req.body);
    return res
      .status(201)
      .send(
        formResponse(`Created category successfully with id ${serviceRes.id}`)
      );
  } catch (error) {
    console.log(error);
    return res.status(500).send(formResponse(null, "Internal error occured"));
  }
};

const getCategories = async (req, res) => {
  try {
    const categoryRes = await getAllCategories();
    return res.status(200).send(formResponse(categoryRes));
  } catch (error) {
    console.log(error);
    return res.status(500).send(formResponse(null, "Internal error occured"));
  }
};

const updateCategory = async (req, res) => {
  try {
    const validatedReq = validationResult(req);
    if (!validatedReq.isEmpty())
      return res.status(400).send(formResponse(null, validatedReq.array()));

    const categoryRes = await updateCategoryById(
      req.params.categoryId,
      req.body
    );
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
    console.log(error);
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
    return res.status(200).send(formResponse(categoryRes));
  } catch (error) {
    console.log(error);
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

    await removeCategoryById(req.params.categoryId);
    return res
      .status(200)
      .send(
        formResponse(
          `Category with id ${req.params.categoryId} deleted successfully.`
        )
      );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(formResponse(null, "Some internal error occured!"));
  }
};

module.exports = {
  addCategory,
  getCategories,
  updateCategory,
  fetchCategoryById,
  deleteCategoryById,
};
