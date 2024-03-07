const { Schema, model } = require("mongoose");

const categoryModel = new Schema({
  categoryName: { type: String },
  desc: { type: String },
  colorHexCode: { type: String, default: "#00FF00" }, // default green
  byUser: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Category", categoryModel, "Category");
