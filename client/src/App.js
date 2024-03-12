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
import UserProfile from "./pages/UserProfile";
import ResetPassword from "./pages/ResetPassword";

function App({ isLoading, errorMsg }) {
  const { isShowAlert } = useToDo();
  return (
    <div className="App">
      <Router>
        <NavBar />
        {isShowAlert && <ErrorAlert errorMsg={errorMsg} />}
        {isLoading && (
          <>
            <br />
            <br />
            <br />
            <Loader />
          </>
        )}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/delete-account" element={<DeleteAccount />} />
          <Route exact path="/categories" element={<Category />} />
          <Route exact path="/tasks" element={<Task />} />
          <Route exact path="/profile" element={<UserProfile />} />
          <Route exact path="/reset-password" element={<ResetPassword />} />
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
