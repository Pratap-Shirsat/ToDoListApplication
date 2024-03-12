import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToDo } from "../context/toDoContext";
import { getResetToken, resetUserPassword } from "../store/actions/userActions";
import { connect } from "react-redux";

const ResetPassword = ({ resetUserPassword, getResetToken }) => {
  const [userForm, setUserForm] = useState({
    resetToken: "",
    newPassword: "",
  });
  const onChange = (e) =>
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  const navigator = useNavigate();
  const { updateAlert } = useToDo();

  const resetPassword = async (event) => {
    event.preventDefault();

    const serviceRes = await resetUserPassword(userForm);
    if (serviceRes) {
      alert(
        "Password has been Successfully reset. Redirecting to login page..."
      );
      navigator("/login");
    } else {
      updateAlert(true);
      setTimeout(() => updateAlert(false), 7000);
    }
  };

  const genResetToken = async () => {
    const email = prompt(
      "Enter the registered email. An auth token will be sent to this email."
    );
    if (email !== null && email.length > 5) {
      const serviceRes = await getResetToken({ userMail: email });
      if (serviceRes) {
        alert("An auth token has been sent to registered email address.");
        return;
      } else {
        updateAlert(true);
        setTimeout(() => updateAlert(false), 7000);
      }
    } else {
      alert("Invalid email");
    }
  };

  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <h1>User Reset Password Page</h1>
        <div className="col-md-10">
          <form
            className="p-1"
            style={{ backgroundColor: "#f0f0f0", borderRadius: "10px" }}
            onSubmit={resetPassword}
          >
            <div className="row">
              <div className="col-12">
                <label htmlFor="resetUserToken" className="form-label">
                  Enter the token received on registered email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="resetUserToken"
                  name="resetToken"
                  onChange={onChange}
                  minLength="30"
                  value={userForm.resetToken}
                  required
                />
              </div>
              <div className="col-6">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  name="newPassword"
                  maxLength="15"
                  minLength="8"
                  onChange={onChange}
                  value={userForm.newPassword}
                  required
                />
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-success mx-3 my-3">
                Reset Password
              </button>
              <button
                type="button"
                className="btn btn-warning mx-3 my-3"
                onClick={genResetToken}
              >
                Generate Reset Token
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = { resetUserPassword, getResetToken };

export default connect(null, mapDispatchToProps)(ResetPassword);
