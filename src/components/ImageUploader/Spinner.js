import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Spinner = () => {
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
      </div>
    </div>
  );
};

export default Spinner;
