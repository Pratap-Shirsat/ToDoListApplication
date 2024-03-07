const taskModel = require("../models/task.model");

const insertTask = async (task) => await taskModel.create(task);

const findAllTasks = async () => taskModel.find().populate("category").exec();

const fetchTaskById = async (taskId) =>
  taskModel.findById(taskId).populate("category").exec();

const updateTaskById = async (taskId, task) =>
  taskModel.findByIdAndUpdate(taskId, task).exec();

const deleteTaskById = async (taskId) =>
  taskModel.findByIdAndDelete(taskId).exec();

const filterTaskByCategoryId = async (categoryId) =>
  taskModel.find({ category: categoryId }).exec();

const filterTaskBySearchString = async (searchString) =>
  taskModel.find({ taskInfo: { $regex: searchString, $options: "i" } }).exec();

const filterTasksBeforeDate = async (beforeDate) =>
  taskModel.find({ dueDate: { $lt: beforeDate } }).exec();

const filterTasksAfterDate = async (afterDate) =>
  taskModel.find({ dueDate: { $gt: afterDate } }).exec();

const filterTasksOnDate = async (onDate) => {
  const startDate = new Date(onDate).setHours(0, 0, 0, 0);
  const endDate = new Date(onDate).setHours(23, 59, 59, 999);

  return taskModel.find({ dueDate: { $gt: startDate, $lt: endDate } }).exec();
};

const filterTasksByStatus = async (status) =>
  taskModel.find({ taskStatus: status }).exec();

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
    return findAllTasks();
  }
};

module.exports = {
  insertTask,
  findAllTasks,
  fetchTaskById,
  updateTaskById,
  deleteTaskById,
  filterTaskByCategoryId,
  filterTaskBySearchString,
  fetchFilteredTasks,
};
