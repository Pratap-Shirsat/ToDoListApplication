const { Schema, model } = require("mongoose");

const taskModel = new Schema({
  taskInfo: { type: String },
  taskStatus: {
    type: String,
    enum: ["Pending", "InProgress", "Completed"],
    default: "Pending",
  },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

module.exports = model("Task", taskModel, "Task");
