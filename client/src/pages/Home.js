import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserCategories } from "../store/actions/categoryActions";
import { fetchUserTasks } from "../store/actions/taskActions";

const Home = ({ token, fetchUserCategories, fetchUserTasks }) => {
  const navigator = useNavigate();
  useEffect(() => {
    if (token === null) {
      navigator("/login");
    } else {
      (async () => await fetchUserCategories(token))();
      (async () => await fetchUserTasks(token))();
    }
  }, []);
  return (
    <>
      <div className="container p-5">
        <div className="center p-5">
          <br />
          <br />
          <h3>This is the homepage of ToDo Application.</h3>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state.app.authToken,
});
const mapDispatchToProps = {
  fetchUserCategories,
  fetchUserTasks,
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
