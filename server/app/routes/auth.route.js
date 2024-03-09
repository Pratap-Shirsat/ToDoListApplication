const express = require("express");
const {
  validateLoginData,
} = require("../controllers/validationSchemes/userValidator");
const { userLogin } = require("../controllers/auth.controller");

const authRoutes = () => {
  const authRouter = express.Router();

  authRouter.post("/user/login", validateLoginData, userLogin);

  return authRouter;
};

module.exports = authRoutes;
