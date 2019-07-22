import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const LoginSpinner = () => {
  return (
    <div className="spinner fadein">
      <div className="spinner-icon-container">
        <FontAwesomeIcon
          className="spinner-icon fa-spin"
          icon={faCog}
          style={{ margin: "0 auto" }}
          size="3x"
          color="#ffc107"
        />
      </div>
    </div>
  );
};

export default LoginSpinner;
