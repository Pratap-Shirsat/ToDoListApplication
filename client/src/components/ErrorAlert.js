import React from "react";

function ErrorAlert({ errorMsg }) {
  return (
    <div style={{ height: "50px" }}>
      <div
        className={`alert alert-danger alert-dismissible fade show`}
        role="alert"
      >
        <strong>{errorMsg}</strong>.
      </div>
    </div>
  );
}

export default ErrorAlert;
