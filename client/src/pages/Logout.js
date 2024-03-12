import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { removeAuthToken } from "../store/actions/appActions";
import { connect } from "react-redux";

const Logout = ({ removeAuthToken }) => {
  const navigator = useNavigate();

  useEffect(() => {
    removeAuthToken();
    alert("Logged out successfully. Redirecting to homepage...");
    navigator("/");
  }, []);

  return (
    <>
      <br />
      <br />
      <br />
      <h3>Logging you out ...</h3>
    </>
  );
};

const mapDispatchToProps = {
  removeAuthToken,
};

export default connect(null, mapDispatchToProps)(Logout);
