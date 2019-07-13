import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Spinner = () => {
  return (
    <div className="spinner fadein">
      <FontAwesomeIcon
        className="spinner-icon"
        icon={faSpinner}
        size="3x"
        color="#f0f0f0"
      />
    </div>
  );
};

export default Spinner;
