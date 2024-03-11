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
            "Content-Type": "application/json",
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
