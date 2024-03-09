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

const filterTasksBeforeDate = async (beforeDate) =>
  taskModel
    .find({ dueDate: { $lt: beforeDate } })
    .populate("category")
    .exec();

const filterTasksAfterDate = async (afterDate) =>
  taskModel
    .find({ dueDate: { $gt: afterDate } })
    .populate("category")
    .exec();

const filterTasksOnDate = async (onDate) => {
  const startDate = new Date(onDate).setHours(0, 0, 0, 0);
  const endDate = new Date(onDate).setHours(23, 59, 59, 999);

  return taskModel
    .find({ dueDate: { $gt: startDate, $lt: endDate } })
    .populate("category")
    .exec();
};

const filterTasksByStatus = async (status) =>
  taskModel.find({ taskStatus: status }).populate("category").exec();

const fetchFilteredTasks = async (filter) => {
  if (filter.beforeDate) {
    return filterTasksBeforeDate(filter.beforeDate);
  } else if (filter.onDate) {
    return filterTasksOnDate(filter.onDate);
  } else if (filter.afterDate) {
    return filterTasksAfterDate(filter.afterDate);
  } else if (filter.categoryId) {
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
