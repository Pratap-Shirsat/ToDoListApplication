const { sign, verify } = require("jsonwebtoken");

const generateAuthToken = async (userData) => {
  const token = await sign(userData, process.env.SECRET_KEY, {
    expiresIn: process.env.Token_Expiry,
  });
  return token;
};

const generateResetAuthToken = async (userData) => {
  const token = await sign(userData, process.env.SECRET_KEY, {
    expiresIn: "30m",
  });
  return token;
};

const validateAuthToken = async (token) => {
  try {
    const userData = await verify(token, process.env.SECRET_KEY);
    return { isValid: true, data: userData };
  } catch (err) {
    return { isValid: false };
  }
};

module.exports = {
  generateAuthToken,
  validateAuthToken,
  generateResetAuthToken,
};
