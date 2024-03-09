const userModel = require("../models/user.model");

const createUser = async (user) => userModel.create(user);

const fetchUserById = async (userId) => userModel.findById(userId).exec();

const updateUser = async (userId, userData) =>
  userModel.findByIdAndUpdate(userId, userData).exec();

const deleteUserById = async (userId) =>
  userModel.deleteOne({ _id: userId }).exec();

const findUserByEmail = async (email) => userModel.findOne({ email }).exec();

const findUserByUsername = async (username) =>
  userModel.findOne({ username }).exec();

module.exports = {
  createUser,
  fetchUserById,
  updateUser,
  deleteUserById,
  findUserByEmail,
  findUserByUsername,
};
