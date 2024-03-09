const { Schema, model } = require("mongoose");

const taskModel = new Schema({
  taskInfo: { type: String },
  taskStatus: {
    type: String,
    enum: ["Pending", "InProgress", "Completed"],
    default: "Pending",
  },
  dueDate: { type: Date, default: () => new Date().setHours(23, 59, 59, 999) },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
});

module.exports = model("Task", taskModel, "Task");
