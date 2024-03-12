const taskModel = require("../models/task.model");
const mongoose = require("mongoose");

const insertTask = async (task) => await taskModel.create(task);

const findAllTasksOfUser = async (userId) =>
  taskModel
    .aggregate([
      {
        $lookup: {
          from: "Category",
          localField: "category",
          foreignField: "_id",
          as: "taskCategory",
        },
      },
      {
        $unwind: "$taskCategory",
      },
      {
        $match: {
          "taskCategory.byUser": new mongoose.Types.ObjectId(userId),
        },
      },
    ])
    .exec();

const fetchTaskById = async (taskId) =>
  taskModel.findById(taskId).populate("category").exec();

const updateTaskById = async (taskId, task) =>
  taskModel.findByIdAndUpdate(taskId, task).exec();

const deleteTaskById = async (taskId) =>
  taskModel.findByIdAndDelete(taskId).exec();

const filterTaskByCategoryId = async (categoryId) =>
  taskModel.find({ category: categoryId }).populate("category").exec();

const filterTaskBySearchString = async (searchString) =>
  taskModel
    .find({ taskInfo: { $regex: searchString, $options: "i" } })
    .populate("category")
    .exec();

const filterTasksByStatus = async (status) =>
  taskModel.find({ taskStatus: status }).populate("category").exec();

const fetchFilteredTasks = async (filter) => {
  if (filter.categoryId) {
    return filterTaskByCategoryId(filter.categoryId);
  } else if (filter.searchString) {
    return filterTaskBySearchString(filter.searchString);
  } else if (filter.taskStatus) {
    return filterTasksByStatus(filter.taskStatus);
  } else {
    return [];
  }
};

const deleteUserTasks = async (categoryIds) =>
  taskModel.deleteMany({ category: { $in: categoryIds } }).exec();

module.exports = {
  insertTask,
  findAllTasksOfUser,
  fetchTaskById,
  updateTaskById,
  deleteTaskById,
  filterTaskByCategoryId,
  filterTaskBySearchString,
  fetchFilteredTasks,
  deleteUserTasks,
};
