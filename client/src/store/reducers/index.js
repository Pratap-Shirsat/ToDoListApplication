import { combineReducers } from "redux";
import appReducer from "./appReducers";

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
