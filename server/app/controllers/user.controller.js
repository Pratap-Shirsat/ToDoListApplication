const {
  createUser,
  fetchUserById,
  updateUser,
  deleteUserById,
} = require("../services/user.service");
const { formResponse } = require("../helpers/responseHelper");
const { validationResult } = require("express-validator");
const { genSalt, hash } = require("bcrypt");
const {
  getAllCategoriesOfUser,
  deleteCategoriesOfUser,
} = require("../services/category.service");
const { deleteUserTasks } = require("../services/task.service");
const logger = require("../helpers/logger");

const registerUser = async (req, res) => {
  try {
    const validatedReq = validationResult(req);
    if (!validatedReq.isEmpty())
      return res.status(400).send(formResponse(null, validatedReq.array()));

    const salt = await genSalt(10);
    req.body.hashedPassword = await hash(req.body.password, salt);
    await createUser(req.body);
    return res
      .status(201)
      .send(formResponse(null, "Registerd user successfuly"));
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .send(
          formResponse(
            null,
            `${Object.keys(error.keyPattern)[0]} already taken!`
          )
        );
    }
    logger.error(`registerUser - ${error}`);
    return res
      .status(500)
      .send(formResponse(null, "An internal error occured."));
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await fetchUserById(req.user.userId);
    if (user === null)
      return res.status(404).send(formResponse(null, "User does not exists."));
    const userDetails = {
      name: user.name,
      username: user.username,
      email: user.email,
      registeredOn: user.registeredDate.toISOString(),
    };
    return res.status(200).send(formResponse(userDetails));
  } catch (error) {
    logger.error(`getUserDetails - ${error}`);
    return res
      .status(500)
      .send(formResponse(null, "An internal error occured."));
  }
};

const updateUserData = async (req, res) => {
  try {
    const validatedReq = validationResult(req);
    if (!validatedReq.isEmpty())
      return res.status(400).send(formResponse(null, validatedReq.array()));

    const user = await fetchUserById(req.user.userId);
    if (user === null)
      return res.status(404).send(formResponse(null, "User does not exists."));

    const userData = {};
    if (req.body.name) {
      userData.name = req.body.name;
    }
    if (req.body.email) {
      userData.email = req.body.email;
    }
    if (req.body.username) {
      userData.username = req.body.username;
    }
    await updateUser(req.user.userId, userData);
    return res
      .status(200)
      .send(formResponse("Updated user details successfully."));
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .send(
          formResponse(
            null,
            `${Object.keys(error.keyPattern)[0]} already taken!`
          )
        );
    }
    logger.error(`updateUserData - ${error}`);
    return res
      .status(500)
      .send(formResponse(null, "An internal error occured."));
  }
};

const resetPassword = async (req, res) => {
  try {
    const validatedReq = validationResult(req);
    if (!validatedReq.isEmpty())
      return res.status(400).send(formResponse(null, validatedReq.array()));

    const user = await fetchUserById(req.user.userId);
    if (user === null)
      return res.status(404).send(formResponse(null, "User does not exists."));

    const salt = await genSalt(10);
    const hashedPassword = hash(req.body.password, salt);

    await updateUser(req.user.userId, { hashedPassword });
    return res
      .status(200)
      .send(formResponse("Password has been reset successfully"));
  } catch (error) {
    logger.error(`resetPassword - ${error}`);
    return res
      .status(500)
      .send(formResponse(null, "An internal error occured."));
  }
};

const deleteUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await fetchUserById(userId);
    if (user === null)
      return res.status(404).send(formResponse(null, "User does not exists."));

    const categories = await getAllCategoriesOfUser(userId);
    const categoryIds = categories.map((category) => category._id);
    await deleteUserTasks(categoryIds);
    await deleteCategoriesOfUser(userId);
    await deleteUserById(userId);
    return res
      .status(200)
      .send(formResponse("User has been deleted successfully"));
  } catch (error) {
    logger.error(`deleteUser - ${error}`);
    return res
      .status(500)
      .send(formResponse(null, "An internal error occured."));
  }
};

module.exports = {
  registerUser,
  getUserDetails,
  updateUserData,
  deleteUser,
  resetPassword,
};
