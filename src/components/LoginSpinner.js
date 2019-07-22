import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoginSpinner = () => {
  return (
    <div className="spinner fadein">
      <div className="spinner-icon-container">
        <FontAwesomeIcon
          className="spinner-icon fa-spin"
          icon={faSpinner}
          style={{ margin: "0 auto" }}
          size="5x"
          color="#f0f0f0"
        />
        <span className="sign-in-message">Installing Your Friends</span>
      </div>
    </div>
  );
};

export default LoginSpinner;
