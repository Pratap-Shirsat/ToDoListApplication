import axios from "axios";
import {
  hideLoader,
  removeAuthToken,
  setErrorMessage,
  showLoader,
} from "./appActions";
import { formErrorResponse } from "../../utils/errorHandler";
import { UPDATE_CATEGORY_LIST } from "../actionTypes";

export const setCategoryList = (categories) => ({
  type: UPDATE_CATEGORY_LIST,
  payload: categories,
});

export const createCategory = ({
  colorCode,
  categoryName,
  categoryDesc,
  token,
}) => {
  return async (dispatch) => {
    dispatch(showLoader());
    const categoryData = {
      categoryName: categoryName,
      desc: categoryDesc,
    };
    if (colorCode.length > 0) {
      categoryData.colorCode = colorCode;
    }
    try {
      await axios.post(
        `${process.env.REACT_APP_TODO_API_URL}/category/`,
        categoryData,
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

export const fetchUserCategories = (token) => {
  return async (dispatch) => {
    dispatch(showLoader());
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_TODO_API_URL}/category/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setCategoryList(data.Data));
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

export const updateCategory = ({
  colorCode,
  categoryName,
  categoryDesc,
  token,
  isCategoryIdSet,
}) => {
  return async (dispatch) => {
    dispatch(showLoader());
    const categoryData = {
      categoryName,
      desc: categoryDesc,
      colorCode,
    };
    try {
      await axios.put(
        `${process.env.REACT_APP_TODO_API_URL}/category/${isCategoryIdSet}`,
        categoryData,
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

export const removeCategory = ({ token, isCategoryIdSet }) => {
  return async (dispatch) => {
    dispatch(showLoader());
    try {
      await axios.delete(
        `${process.env.REACT_APP_TODO_API_URL}/category/${isCategoryIdSet}`,
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
