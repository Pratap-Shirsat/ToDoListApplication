import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers";
import { thunk } from "redux-thunk";

// Load state from local storage, if available
const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
