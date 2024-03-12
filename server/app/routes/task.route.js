const express = require("express");
const {
  taskDataValidate,
  validateTaskId,
  validateFilterData,
  taskUpdateDataValidate,
} = require("../controllers/validationSchemes/taskValidators");
const {
  addTask,
  getAllTasks,
  findTaskById,
  updateTask,
  removeTask,
  getFilteredTasks,
} = require("../controllers/task.controller");
const { authorizeUser } = require("../controllers/middlewares/authMiddleware");

const taskRoutes = () => {
  const taskRouter = express.Router();

  taskRouter.post("/", authorizeUser, taskDataValidate, addTask);
  taskRouter.get("/", authorizeUser, getAllTasks);
  taskRouter.get(
    "/filter",
    authorizeUser,
    validateFilterData,
    getFilteredTasks
  );
  taskRouter.get("/:taskId", authorizeUser, validateTaskId, findTaskById);
  taskRouter.put(
    "/:taskId",
    authorizeUser,
    validateTaskId,
    taskUpdateDataValidate,
    updateTask
  );
  taskRouter.delete("/:taskId", authorizeUser, validateTaskId, removeTask);

  return taskRouter;
};

module.exports = taskRoutes;
