import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToDo } from "../context/toDoContext";
import { userLogin } from "../store/actions/appActions";
import { connect } from "react-redux";

const Login = ({ userLogin }) => {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const { updateAlert } = useToDo();
  const navigator = useNavigate();
  const onChange = (e) =>
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });

  const loginUser = async (event) => {
    event.preventDefault();
    const userLoginRes = await userLogin(loginForm);
    if (userLoginRes) {
      alert("Successfully logged In! Redirecting to homepage...");
      navigator("/");
    } else {
      updateAlert(true);
      setTimeout(() => updateAlert(false), 5000);
    }
  };
  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <h2>User Login Form</h2>
        <div className="col-md-6">
          <form
            className="p-3"
            style={{ backgroundColor: "#f0f0f0", borderRadius: "10px" }}
            onSubmit={loginUser}
          >
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                minLength="5"
                maxLength="20"
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="userPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="userPassword"
                name="password"
                minLength="8"
                maxLength="15"
                onChange={onChange}
                required
              />
            </div>
            <div className="mb-3 text-center">
              <button type="submit" className="btn btn-primary">
                Log me In
              </button>
            </div>
          </form>
          <div>
            <a href="/register">Want to Register?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = null;
const mapDispatchToProps = {
  userLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
