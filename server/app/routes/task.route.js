const express = require("express");
const {
  taskDataValidate,
  validateTaskId,
  validateFilterData,
  taskStatusValidate,
  categoryValidate,
  taskUpdateDataValidate,
} = require("../controllers/validationSchemes/taskValidators");
const {
  addTask,
  getAllTasks,
  findTaskById,
  updateTask,
  removeTask,
  getFilteredTasks,
  updateTaskStatus,
  updateTaskCategory,
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
    "/status/:taskId",
    authorizeUser,
    validateTaskId,
    taskStatusValidate,
    updateTaskStatus
  );
  taskRouter.put(
    "/category/:taskId",
    authorizeUser,
    validateTaskId,
    categoryValidate,
    updateTaskCategory
  );
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
