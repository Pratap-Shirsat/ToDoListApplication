import {
  REMOVE_AUTH_TOKEN,
  SAVE_AUTH_TOKEN,
  SET_ERROR_MESSAGE,
  SET_LOADER,
  UNSET_LOADER,
} from "../actionTypes";
import axios from "axios";

export const showLoader = () => ({
  type: SET_LOADER,
});

export const hideLoader = () => ({
  type: UNSET_LOADER,
});

export const setAuthToken = (token) => ({
  type: SAVE_AUTH_TOKEN,
  payload: token,
});

export const removeAuthToken = () => ({
  type: REMOVE_AUTH_TOKEN,
});

export const setErrorMessage = (errMsg) => ({
  type: SET_ERROR_MESSAGE,
  payload: errMsg,
});

export const userLogin = (userData) => {
  return async (dispatch) => {
    dispatch(showLoader());
    try {
      const { username, password } = userData;
      const dataRes = await axios
        .post(
          `${process.env.REACT_APP_TODO_API_URL}/auth/user/login`,
          { username, password },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((resData) => {
          return { token: resData.data.Data.token };
        })
        .catch((err) => {
          if (Array.isArray(err.response.data.ErrorMessage)) {
            return {
              errMsg: err.response.data.ErrorMessage.map(
                (error) => error.msg
              ).join(", "),
            };
          } else {
            return { errMsg: err.response.data.ErrorMessage };
          }
        });

      if (dataRes.token) {
        dispatch(setAuthToken(dataRes.token));
        return true;
      } else {
        dispatch(setErrorMessage(dataRes.errMsg));
        return false;
      }
    } catch (error) {
      dispatch(setErrorMessage("Some server error occured."));
      return false;
    } finally {
      dispatch(hideLoader());
    }
  };
};
