const express = require("express");
const {
  userDataValidate,
  validatePassword,
  validateUpdateData,
  validateEmail,
} = require("../controllers/validationSchemes/userValidator");
const {
  registerUser,
  getUserDetails,
  resetPassword,
  updateUserData,
  deleteUser,
  generateResetToken,
} = require("../controllers/user.controller");
const {
  authorizeUser,
  authResetToken,
} = require("../controllers/middlewares/authMiddleware");

const userRoutes = () => {
  const userRouter = express.Router();

  userRouter.post("/register", userDataValidate, registerUser);
  userRouter.get("/", authorizeUser, getUserDetails);
  userRouter.post(
    "/reset-pass",
    authResetToken,
    validatePassword,
    resetPassword
  );
  userRouter.post("/generate-token", validateEmail, generateResetToken);
  userRouter.put("/", authorizeUser, validateUpdateData, updateUserData);
  userRouter.delete("/", authorizeUser, deleteUser);

  return userRouter;
};

module.exports = userRoutes;
