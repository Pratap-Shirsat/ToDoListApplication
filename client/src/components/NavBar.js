import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

const NavBar = ({ isLoggedIn }) => {
  const location = useLocation();
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img
            src="/checklist.png"
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          ToDo App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                href="/"
              >
                Home
              </a>
            </li>
            {isLoggedIn && (
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    location.pathname === "/categories" ? "active" : ""
                  }`}
                  aria-current="page"
                  href="/categories"
                >
                  Category
                </a>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    location.pathname === "/tasks" ? "active" : ""
                  }`}
                  aria-current="page"
                  href="/tasks"
                >
                  Task
                </a>
              </li>
            )}
            {isLoggedIn && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  More
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/profile">
                      Update Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/delete-account">
                      Delete Account
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/logout">
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            )}
          </ul>
          {!isLoggedIn && (
            <span className="nav-item">
              <a className="btn btn-outline-success" href="/login">
                Login
              </a>
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.app.authToken !== null,
});

export default connect(mapStateToProps, {})(NavBar);
