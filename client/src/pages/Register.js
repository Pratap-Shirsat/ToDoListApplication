import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToDo } from "../context/toDoContext";
import { userRegister } from "../store/actions/userActions";
import { connect } from "react-redux";

const Register = ({ userRegister }) => {
  const [userForm, setUserForm] = useState({
    fullName: "",
    userEmail: "",
    username: "",
    password: "",
  });
  const onChange = (e) =>
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  const navigator = useNavigate();
  const { updateAlert } = useToDo();

  const registerUser = async (event) => {
    event.preventDefault();

    const serviceRes = await userRegister(userForm);
    if (serviceRes) {
      alert("Successfully Registered. Redirecting to login page...");
      navigator("/login");
    } else {
      updateAlert(true);
      setTimeout(() => updateAlert(false), 7000);
    }
  };
  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <h2>User Registration Form</h2>
        <div className="col-md-6">
          <form
            className="p-3"
            style={{ backgroundColor: "#f0f0f0", borderRadius: "10px" }}
            onSubmit={registerUser}
          >
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="userFullname" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="userFullname"
                  name="fullName"
                  onChange={onChange}
                  maxLength="30"
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="userEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="userEmail"
                  name="userEmail"
                  maxLength="100"
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  onChange={onChange}
                  minLength="5"
                  maxLength="20"
                  required
                />
              </div>
              <div className="col">
                <label htmlFor="userPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="userPassword"
                  name="password"
                  onChange={onChange}
                  minLength="8"
                  maxLength="15"
                  required
                />
              </div>
            </div>
            <div className="mb-3 text-center">
              <button type="submit" className="btn btn-primary">
                Register me
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  userRegister,
};

export default connect(null, mapDispatchToProps)(Register);
