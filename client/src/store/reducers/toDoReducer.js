import {
  REMOVE_AUTH_TOKEN,
  UPDATE_CATEGORY_LIST,
  UPDATE_TASK_LIST,
  UPDATE_USER_DETAILS,
} from "../actionTypes";

const initialState = {
  categoryList: [],
  taskList: [],
  userDetails: null,
};

const toDoReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY_LIST:
      return { ...state, categoryList: action.payload };

    case UPDATE_TASK_LIST:
      return { ...state, taskList: action.payload };

    case UPDATE_USER_DETAILS:
      return { ...state, userDetails: action.payload };

    case REMOVE_AUTH_TOKEN:
      localStorage.removeItem("reduxState");
      return initialState;

    default:
      return state;
  }
};

export default toDoReducer;
