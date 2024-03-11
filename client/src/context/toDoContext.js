import { createContext, useContext, useState } from "react";

const ToDoContext = createContext();

export const ToDoProvider = ({ children }) => {
  const [isShowAlert, setAlert] = useState(false);

  const updateAlert = (flag) => setAlert(flag);

  return (
    <ToDoContext.Provider
      value={{
        updateAlert,
        isShowAlert,
      }}
    >
      {children}
    </ToDoContext.Provider>
  );
};

export const useToDo = () => useContext(ToDoContext);
