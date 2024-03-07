const { Schema, model } = require("mongoose");

const userModel = new Schema({
  name: { type: String },
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  hashedPassword: { type: String },
  registeredDate: { type: Date, default: new Date() },
});

module.exports = model("User", userModel, "User");
