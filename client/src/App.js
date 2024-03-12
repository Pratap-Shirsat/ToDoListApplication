import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Loader from "./components/Loader";
import { useToDo } from "./context/toDoContext";
import ErrorAlert from "./components/ErrorAlert";
import { connect } from "react-redux";
import DeleteAccount from "./pages/DeleteAccount";
import Category from "./pages/Category";
import Task from "./pages/Task";

function App({ isLoading, errorMsg }) {
  const { isShowAlert } = useToDo();
  return (
    <div className="App">
      <NavBar />
      {isLoading && (
        <>
          <br />
          <br />
          <br />
          <Loader />
        </>
      )}
      {isShowAlert && <ErrorAlert errorMsg={errorMsg} />}
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/delete-account" element={<DeleteAccount />} />
          <Route exact path="/categories" element={<Category />} />
          <Route exact path="/tasks" element={<Task />} />
        </Routes>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.app.isLoading,
  errorMsg: state.app.errorMsg,
});

export default connect(mapStateToProps, {})(App);
