const express = require("express");
const {
  taskDataValidate,
  validateTaskId,
  validateFilterData,
} = require("../controllers/validationSchemes/taskValidators");
const {
  addTask,
  getAllTasks,
  findTaskById,
  updateTask,
  removeTask,
  getFilteredTasks,
} = require("../controllers/task.controller");

const taskRoutes = () => {
  const taskRouter = express.Router();

  taskRouter.post("/", taskDataValidate, addTask);
  taskRouter.get("/", getAllTasks);
  taskRouter.get("/filter", validateFilterData, getFilteredTasks);
  taskRouter.get("/:taskId", validateTaskId, findTaskById);
  taskRouter.put("/:taskId", validateTaskId, taskDataValidate, updateTask);
  taskRouter.delete("/:taskId", validateTaskId, removeTask);

  return taskRouter;
};

module.exports = taskRoutes;
