const { validationResult } = require("express-validator");
const { formResponse } = require("../helpers/responseHelper");
const {
  insertTask,
  findAllTasks,
  fetchTaskById,
  updateTaskById,
  deleteTaskById,
  fetchFilteredTasks,
} = require("../services/task.service");
const { findCategoryById } = require("../services/category.service");

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
    req.body.category = req.body.categoryId;
    if (req.body.dueDate === null) {
      return res.status(400).send(formResponse(null, "Due date is invalid"));
    }
    if (req.body.dueDate !== null) {
      if (req.body.dueDate < new Date())
        return res
          .status(400)
          .send(formResponse(null, "Due date should be of future"));
    }
    const serviceRes = await insertTask(req.body);
    return res
      .status(201)
      .send(formResponse(`Created task successfully with id ${serviceRes.id}`));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(formResponse(null, "Some internal error occured!"));
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasksRes = await findAllTasks();
    return res.status(200).send(formResponse(tasksRes));
  } catch (error) {
    console.log(error);
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
    return res.status(200).send(formResponse(taskRes));
  } catch (error) {
    console.log(error);
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
    req.body.category = req.body.categoryId;
    if (req.body.dueDate === null) {
      return res.status(400).send(formResponse(null, "Due date is invalid"));
    }
    if (req.body.dueDate !== null) {
      if (req.body.dueDate <= new Date())
        return res
          .status(400)
          .send(formResponse(null, "Due date should be of future"));
    }
    const taskRes = await updateTaskById(req.params.taskId, req.body);
    if (taskRes === null)
      return res
        .status(404)
        .send(
          formResponse(null, `Task with id ${req.params.taskId} not found!`)
        );
    return res.status(200).send(formResponse("Updated task successfully"));
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    if (
      req.query.beforeDate === null ||
      req.query.onDate === null ||
      req.query.afterDate === null
    ) {
      return res.status(400).send(formResponse(null, "Invalid date format"));
    }
    if (req.query.beforeDate) {
      filterObj.beforeDate = req.query.beforeDate;
    }
    if (req.query.afterDate) {
      filterObj.afterDate = req.query.afterDate;
    }
    if (req.query.onDate) {
      filterObj.onDate = req.query.onDate;
    }

    const taskRes = await fetchFilteredTasks(filterObj);
    return res.status(200).send(formResponse(taskRes));
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send(formResponse(null, "Some internal error occured!"));
  }
};

module.exports = {
  addTask,
  getAllTasks,
  findTaskById,
  updateTask,
  removeTask,
  getFilteredTasks,
};
