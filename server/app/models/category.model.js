const { Schema, model } = require("mongoose");

const categoryModel = new Schema({
  categoryName: { type: String },
  desc: { type: String },
  colorCode: { type: String, default: "bg-success" }, // default green
  byUser: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = model("Category", categoryModel, "Category");
