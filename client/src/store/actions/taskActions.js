import axios from "axios";
import {
  hideLoader,
  removeAuthToken,
  setErrorMessage,
  showLoader,
} from "./appActions";
import { formErrorResponse } from "../../utils/errorHandler";
import { UPDATE_TASK_LIST } from "../actionTypes";

export const setTaskList = (tasks) => ({
  type: UPDATE_TASK_LIST,
  payload: tasks,
});

export const fetchUserTasks = (token) => {
  return async (dispatch) => {
    dispatch(showLoader());
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_TODO_API_URL}/task/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setTaskList(data.Data));
      return true;
    } catch (error) {
      const { tokenExpired, errMsg } = formErrorResponse(error);

      if (tokenExpired) {
        dispatch(removeAuthToken());
      }

      dispatch(setErrorMessage(errMsg));
      return false;
    } finally {
      dispatch(hideLoader());
    }
  };
};

export const addTask = (task) => {
  return async (dispatch) => {
    dispatch(showLoader());
    try {
      await axios.post(
        `${process.env.REACT_APP_TODO_API_URL}/task/`,
        {
          taskInfo: task.taskName,
          categoryId: task.categoryId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${task.token}`,
          },
        }
      );
      return true;
    } catch (error) {
      const { tokenExpired, errMsg } = formErrorResponse(error);

      if (tokenExpired) {
        dispatch(removeAuthToken());
      }

      dispatch(setErrorMessage(errMsg));
      return false;
    } finally {
      dispatch(hideLoader());
    }
  };
};

export const removeTask = ({ taskId, token }) => {
  return async (dispatch) => {
    dispatch(showLoader());
    try {
      await axios.delete(
        `${process.env.REACT_APP_TODO_API_URL}/task/${taskId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return true;
    } catch (error) {
      const { tokenExpired, errMsg } = formErrorResponse(error);

      if (tokenExpired) {
        dispatch(removeAuthToken());
      }

      dispatch(setErrorMessage(errMsg));
      return false;
    } finally {
      dispatch(hideLoader());
    }
  };
};

export const updateTask = (task) => {
  return async (dispatch) => {
    dispatch(showLoader());
    try {
      await axios.put(
        `${process.env.REACT_APP_TODO_API_URL}/task/${task.taskId}`,
        {
          taskInfo: task.taskName,
          categoryId: task.categoryId,
          taskStatus: task.taskStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${task.token}`,
          },
        }
      );
      return true;
    } catch (error) {
      const { tokenExpired, errMsg } = formErrorResponse(error);

      if (tokenExpired) {
        dispatch(removeAuthToken());
      }

      dispatch(setErrorMessage(errMsg));
      return false;
    } finally {
      dispatch(hideLoader());
    }
  };
};

export const filterUserTasks = (data) => {
  return async (dispatch) => {
    dispatch(showLoader());
    const { filterStatus, filterCategory, filterString, token } = data;
    try {
      let searchQuery = "";
      if (filterStatus) {
        searchQuery += `taskStatus=${filterStatus}`;
      }
      if (filterCategory) {
        searchQuery += `categoryId=${filterCategory}`;
      }
      if (filterString) {
        searchQuery += `searchString=${filterString}`;
      }
      const { data } = await axios.get(
        `${process.env.REACT_APP_TODO_API_URL}/task/filter?${searchQuery}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setTaskList(data.Data));
      return true;
    } catch (error) {
      const { tokenExpired, errMsg } = formErrorResponse(error);

      if (tokenExpired) {
        dispatch(removeAuthToken());
      }

      dispatch(setErrorMessage(errMsg));
      return false;
    } finally {
      dispatch(hideLoader());
    }
  };
};
