const { validateAuthToken } = require("../../helpers/authHelper");
const { formResponse } = require("../../helpers/responseHelper");
const logger = require("../../helpers/logger");

const authorizeUser = async (req, res, next) => {
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      const validatedUser = await validateAuthToken(
        req.headers.authorization.split(" ")[1]
      );
      if (validatedUser.isValid) {
        req.user = validatedUser.data;
        return next();
      } else {
        return res
          .status(403)
          .send(formResponse(null, "Authorization token is expired!"));
      }
    } else {
      return res
        .status(403)
        .send(formResponse(null, "Authorization token is required!"));
    }
  } catch (error) {
    logger.error(`authorizeUser - ${error}`);
    return res
      .status(500)
      .send(formResponse(null, "Some internal error occured"));
  }
};

module.exports = {
  authorizeUser,
};
