const { findUserByUsername } = require("../services/user.service");
const { formResponse } = require("../helpers/responseHelper");
const { validationResult } = require("express-validator");
const { compare } = require("bcrypt");
const { generateAuthToken } = require("../helpers/authHelper");

const userLogin = async (req, res) => {
  try {
    const validatedReq = validationResult(req);
    if (!validatedReq.isEmpty()) {
      return res.status(400).send(formResponse(null, validatedReq.array()));
    }

    const user = await findUserByUsername(req.body.username);
    if (user === null)
      return res.status(404).send(formResponse(null, "User not found!"));

    const validUser = await compare(req.body.password, user.hashedPassword);
    if (!validUser)
      return res.status(403).send(formResponse(null, "Invalid credentials!"));

    const token = await generateAuthToken({ userId: user._id });
    return res.status(200).send(formResponse({ token }));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(formResponse(null, "Some internal error occured"));
  }
};

module.exports = { userLogin };
