import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Spinner = () => {
  return (
    <div className="spinner fadein">
      <FontAwesomeIcon icon={faSpinner} size="5x" color="#3B5998" />
    </div>
  );
};

export default Spinner;
