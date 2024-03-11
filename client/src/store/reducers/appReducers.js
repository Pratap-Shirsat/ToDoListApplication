import {
  REMOVE_AUTH_TOKEN,
  SAVE_AUTH_TOKEN,
  SET_ERROR_MESSAGE,
  SET_LOADER,
  UNSET_LOADER,
} from "../actionTypes";

const initialState = {
  isLoading: false,
  errorMsg: null,
  showError: false,
  authToken: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADER:
      return {
        ...state,
        isLoading: true,
      };
    case UNSET_LOADER: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMsg: action.payload,
      };
    case SAVE_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload,
      };
    case REMOVE_AUTH_TOKEN:
      localStorage.removeItem("reduxState");
      return initialState;
    default:
      return state;
  }
};

export default appReducer;
