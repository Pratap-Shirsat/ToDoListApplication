import { connect } from "react-redux";
import { deleteUserAccount } from "../store/actions/userActions";
import { removeAuthToken } from "../store/actions/appActions";
import { useNavigate } from "react-router-dom";
import { useToDo } from "../context/toDoContext";

const DeleteAccount = ({ token, removeAuthToken, deleteUserAccount }) => {
  const navigator = useNavigate();
  const { updateAlert } = useToDo();

  const deleteUser = async (event) => {
    event.preventDefault();
    const apiRes = await deleteUserAccount(token);
    if (apiRes) {
      removeAuthToken();
      alert("Account deleted successfully. Redirecting to homepage");
      navigator("/");
    } else {
      updateAlert(true);
      setTimeout(() => updateAlert(false), 5000);
    }
  };
  return (
    <>
      <div className="container p-5">
        <form
          className="pd-3"
          style={{ backgroundColor: "#f0f0f0", borderRadius: "10px" }}
          onSubmit={deleteUser}
        >
          <h2>
            Are you sure you want to delete your account? All the saved data
            will be lost forever!
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: "10%",
              paddingRight: "10%",
              paddingBottom: "10px",
            }}
          >
            <button
              type="button"
              className="btn btn-warning p-2"
              onClick={() => (document.location.href = "/")}
            >
              Cancel
            </button>
            <span> </span>
            <button type="submit" className="btn btn-danger p-2">
              Yes Delete Account
            </button>
          </div>
        </form>
      </div>
      <br />
      <br />
      <br />
      <h2> Deleting user account...</h2>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.app.authToken,
});

const mapDispatchToProps = {
  deleteUserAccount,
  removeAuthToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);
