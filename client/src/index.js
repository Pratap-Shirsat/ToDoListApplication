import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToDoProvider } from "./context/toDoContext";
import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToDoProvider>
        <App />
      </ToDoProvider>
    </Provider>
  </React.StrictMode>
);
