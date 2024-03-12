import { combineReducers } from "redux";
import appReducer from "./appReducers";
import toDoReducer from "./toDoReducer";

const rootReducer = combineReducers({
  app: appReducer,
  toDo: toDoReducer,
});

export default rootReducer;
