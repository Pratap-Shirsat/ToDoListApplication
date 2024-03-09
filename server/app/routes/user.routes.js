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
const { authorizeUser } = require("../controllers/middlewares/authMiddleware");

const userRoutes = () => {
  const userRouter = express.Router();

  userRouter.post("/register", userDataValidate, registerUser);
  userRouter.get("/", authorizeUser, getUserDetails);
  userRouter.post("/reset-pass", validatePassword, resetPassword); // need to implement proper logic for reset
  userRouter.put("/", authorizeUser, validateUpdateData, updateUserData);
  userRouter.delete("/", authorizeUser, deleteUser);

  return userRouter;
};

module.exports = userRoutes;
