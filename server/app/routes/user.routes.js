const express = require("express");
const {
  userDataValidate,
  validatePassword,
  validateUpdateData,
} = require("../controllers/validationSchemes/userValidator");
const {
  registerUser,
  getUserDetails,
  resetPassword,
  updateUserData,
  deleteUser,
} = require("../controllers/user.controller");

const userRoutes = () => {
  const userRouter = express.Router();

  userRouter.post("/register", userDataValidate, registerUser);
  userRouter.get("/", getUserDetails);
  userRouter.post("/reset-pass", validatePassword, resetPassword);
  userRouter.put("/", validateUpdateData, updateUserData);
  userRouter.delete("/", deleteUser);

  return userRouter;
};

module.exports = userRoutes;
