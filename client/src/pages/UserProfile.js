import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToDo } from "../context/toDoContext";
import { fetchUserDetails, updateUser } from "../store/actions/userActions";
import { connect } from "react-redux";

const UserProfile = ({ token, fetchUserDetails, updateUser, userData }) => {
  const [userForm, setUserForm] = useState({
    fullName: userData?.name,
    userEmail: userData?.email,
    username: userData?.username,
    registeredOn: new Date(userData?.registeredOn),
  });
  useEffect(() => {
    if (token !== null) {
      (async () => await fetchUserDetails(token))();
    } else {
      navigator("/login");
    }
  }, []);
  const onChange = (e) =>
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  const navigator = useNavigate();
  const { updateAlert } = useToDo();

  const updateUserDetails = async (event) => {
    event.preventDefault();

    const serviceRes = await updateUser({ ...userForm, token });
    if (serviceRes) {
      await fetchUserDetails(token);
      alert("Successfully Updated user details.");
    } else {
      updateAlert(true);
      setTimeout(() => updateAlert(false), 7000);
    }
  };

  return (
    <div className="container p-5">
      <div className="row justify-content-center">
        <h2>User Profile</h2>
        <div className="col-md-8">
          <form
            className="p-3"
            style={{ backgroundColor: "#f0f0f0", borderRadius: "10px" }}
            onSubmit={updateUserDetails}
          >
            <div className="row md-4">
              <div className="col-6">
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
                  value={userForm.fullName}
                  required
                />
              </div>
              <div className="col-6">
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
                  value={userForm.userEmail}
                  required
                />
              </div>
            </div>
            <div className="row mb-4 my-2">
              <div className="col-6">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  onChange={onChange}
                  value={userForm.username}
                  minLength="5"
                  maxLength="20"
                  required
                />
              </div>
              <div className="col-6">
                <label htmlFor="registeredOn" className="form-label">
                  Registered On
                </label>
                <input type="datetime" value={userForm.registeredOn} disabled />
              </div>
            </div>
            <div className=" text-center">
              <button type="submit" className="btn btn-info mx-3 my-3">
                Update profile
              </button>
              <button
                type="button"
                className="btn btn-warning mx-3 my-3"
                onClick={() => navigator("/reset-password")}
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.app.authToken,
  userData: state.toDo.userDetails,
});
const mapDispatchToProps = { fetchUserDetails, updateUser };

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
