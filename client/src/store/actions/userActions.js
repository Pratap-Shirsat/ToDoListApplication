import { UPDATE_USER_DETAILS } from "../actionTypes";
import { hideLoader, setErrorMessage, showLoader } from "./appActions";
import axios from "axios";

export const userRegister = (userForm) => {
  return async (dispatch) => {
    dispatch(showLoader());
    try {
      const { fullName, userEmail, username, password } = userForm;
      const serviceRes = await axios
        .post(
          `${process.env.REACT_APP_TODO_API_URL}/user/register`,
          {
            name: fullName,
            email: userEmail,
            username,
            password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          return { errMsg: null };
        })
        .catch((err) => {
          return { errMsg: err.response.data.ErrorMessage };
        });
      if (serviceRes.errMsg === null) {
        return true;
      } else {
        if (Array.isArray(serviceRes.errMsg)) {
          dispatch(
            setErrorMessage(
              serviceRes.errMsg.map((error) => error.msg).join(", ")
            )
          );
        } else {
          dispatch(setErrorMessage(serviceRes.errMsg));
        }
        return false;
      }
    } catch (error) {
      dispatch(setErrorMessage("Some error occured at server"));
      return false;
    } finally {
      dispatch(hideLoader());
    }
  };
};

export const deleteUserAccount = (token) => {
  return async (dispatch) => {
    dispatch(showLoader());
    try {
      await axios.delete(`${process.env.REACT_APP_TODO_API_URL}/user/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error) {
      dispatch(
        setErrorMessage(
          error.response.data.ErrorMessage || "Some error occurred at server"
        )
      );
      return false;
    } finally {
      dispatch(hideLoader());
    }
  };
};

export const fetchUserDetails = (token) => {
  return async (dispatch) => {
    dispatch(showLoader());
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_TODO_API_URL}/user/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setUserDetails(data.Data));
      return true;
    } catch (error) {
      dispatch(
        setErrorMessage(
          error.response.data.ErrorMessage || "Some error occurred at server"
        )
      );
      return false;
    } finally {
      dispatch(hideLoader());
    }
  };
};

export const updateUser = (userForm) => {
  return async (dispatch) => {
    dispatch(showLoader());
    try {
      const { fullName, userEmail, username, token } = userForm;
      await axios.put(
        `${process.env.REACT_APP_TODO_API_URL}/user/`,
        {
          name: fullName,
          email: userEmail,
          username,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return true;
    } catch (error) {
      dispatch(
        setErrorMessage(
          error.response.data.ErrorMessage || "Some error occurred at server"
        )
      );
      return false;
    } finally {
      dispatch(hideLoader());
    }
  };
};

export const setUserDetails = (details) => ({
  type: UPDATE_USER_DETAILS,
  payload: details,
});

export const resetUserPassword = (resetData) => {
  return async (dispatch) => {
    dispatch(showLoader());
    try {
      await axios.post(
        `${process.env.REACT_APP_TODO_API_URL}/user/reset-pass`,
        {
          password: resetData.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resetData.resetToken}`,
          },
        }
      );
      return true;
    } catch (error) {
      dispatch(
        setErrorMessage(
          error.response.data.ErrorMessage || "Some error occurred at server"
        )
      );
      return false;
    } finally {
      dispatch(hideLoader());
    }
  };
};

export const getResetToken = (data) => {
  return async (dispatch) => {
    dispatch(showLoader());
    try {
      await axios.post(
        `${process.env.REACT_APP_TODO_API_URL}/user/generate-token`,
        {
          userEmail: data.userMail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return true;
    } catch (error) {
      dispatch(
        setErrorMessage(
          error.response.data.ErrorMessage || "Some error occurred at server"
        )
      );
      return false;
    } finally {
      dispatch(hideLoader());
    }
  };
};
