const { validationResult } = require("express-validator");
const { formResponse } = require("../helpers/responseHelper");
const {
  insertTask,
  findAllTasksOfUser,
  fetchTaskById,
  updateTaskById,
  deleteTaskById,
  fetchFilteredTasks,
} = require("../services/task.service");
const { findCategoryById } = require("../services/category.service");
const logger = require("../helpers/logger");

const addTask = async (req, res) => {
  try {
    const validateRes = validationResult(req);
    if (!validateRes.isEmpty()) {
      return res.status(400).send(formResponse(null, validateRes.array()));
    }
    const category = await findCategoryById(req.body.categoryId);
    if (category === null) {
      return res
        .status(404)
        .send(
          formResponse(
            null,
            `Category with id ${req.body.categoryId} not found.`
          )
        );
    }
    const taskData = {
      category: req.body.categoryId,
      taskInfo: req.body.taskInfo,
    };
    const serviceRes = await insertTask(taskData);
    return res
      .status(201)
      .send(formResponse(`Created task successfully with id ${serviceRes.id}`));
  } catch (error) {
    logger.error(`addTask - ${error}`);
    return res
      .status(500)
      .send(formResponse(null, "Some internal error occured!"));
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasksRes = await findAllTasksOfUser(req.user.userId);
    return res.status(200).send(formResponse(generateTaskResponse(tasksRes)));
  } catch (error) {
    logger.error(`getAllTasks - ${error}`);
    return res
      .status(500)
      .send(formResponse(null, "Some internal error occured!"));
  }
};

const findTaskById = async (req, res) => {
  try {
    const validatedReq = validationResult(req);
    if (!validatedReq.isEmpty())
      return res.status(400).send(formResponse(null, validatedReq.array()));

    const taskRes = await fetchTaskById(req.params.taskId);
    if (taskRes === null)
      return res
        .status(404)
        .send(
          formResponse(null, `Task with id ${req.params.taskId} not found!`)
        );
    let taskList = [];
    taskList.push(taskRes);
    return res
      .status(200)
      .send(formResponse(generateTaskResponse(taskList)[0]));
  } catch (error) {
    logger.error(`findTaskById - ${error}`);
    return res
      .status(500)
      .send(formResponse(null, "Some internal error occured!"));
  }
};

const updateTask = async (req, res) => {
  try {
    const validatedReq = validationResult(req);
    if (!validatedReq.isEmpty())
      return res.status(400).send(formResponse(null, validatedReq.array()));

    let taskRes = await fetchTaskById(req.params.taskId);
    const updateTaskData = {
      taskInfo: req.body.taskInfo,
    };
    if (taskRes === null)
      return res
        .status(404)
        .send(
          formResponse(null, `Task with id ${req.params.taskId} not found!`)
        );

    if (taskRes.taskStatus !== req.body.taskStatus) {
      updateTaskData.taskStatus = req.body.taskStatus;
    }

    if (taskRes.category._id !== req.body.categoryId) {
      const category = await findCategoryById(req.body.categoryId);
      if (category === null)
        return res.status(404).send(formResponse(null, "Category not found!"));
      updateTaskData.category = req.body.categoryId;
    }

    await updateTaskById(req.params.taskId, updateTaskData);
    return res.status(200).send(formResponse("Updated task successfully"));
  } catch (error) {
    logger.error(`updateTask - ${error}`);
    return res
      .status(500)
      .send(formResponse(null, "Some internal error occured!"));
  }
};

const removeTask = async (req, res) => {
  try {
    const validatedReq = validationResult(req);
    if (!validatedReq.isEmpty())
      return res.status(400).send(formResponse(null, validatedReq.array()));

    const taskRes = await deleteTaskById(req.params.taskId);
    if (taskRes === null)
      return res
        .status(404)
        .send(
          formResponse(null, `Task with id ${req.params.taskId} not found!`)
        );
    return res.status(200).send(formResponse("Deleted task successfully"));
  } catch (error) {
    logger.error(`removeTask - ${error}`);
    return res
      .status(500)
      .send(formResponse(null, "Some internal error occured!"));
  }
};

const getFilteredTasks = async (req, res) => {
  try {
    let filterObj = {};
    if (req.query.categoryId) {
      filterObj.categoryId = req.query.categoryId;
    }
    if (req.query.searchString) {
      filterObj.searchString = req.query.searchString.trim();
    }
    if (req.query.taskStatus) {
      filterObj.taskStatus = req.query.taskStatus;
    }

    const taskRes = await fetchFilteredTasks(filterObj);
    return res.status(200).send(formResponse(generateTaskResponse(taskRes)));
  } catch (error) {
    logger.error(`getFilteredTasks - ${error}`);
    return res
      .status(500)
      .send(formResponse(null, "Some internal error occured!"));
  }
};

const generateTaskResponse = (tasks) => {
  const taskList = [];
  tasks.forEach((r) =>
    taskList.push({
      taskId: r._id,
      taskInfo: r.taskInfo,
      dueDate: r.dueDate,
      taskStatus: r.taskStatus,
      categoryInfo: {
        categoryId: r.category._id,
        categoryName: r.category.categoryName ?? r.taskCategory.categoryName,
        colorCode: r.category.colorCode ?? r.taskCategory.colorCode,
        desc: r.category.desc ?? r.taskCategory.desc,
      },
    })
  );
  return taskList;
};

module.exports = {
  addTask,
  getAllTasks,
  findTaskById,
  updateTask,
  removeTask,
  getFilteredTasks,
};
