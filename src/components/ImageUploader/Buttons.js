import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const Buttons = ({ onImageUpload }) => (
  <div className="buttons fadein">
    <div className="button">
      <label htmlFor="single">
        <FontAwesomeIcon icon={faImage} color="#3B5998" size="3x" />
      </label>
      <input type="file" id="single" onChange={onImageUpload} />
    </div>
  </div>
);

export default Buttons;
