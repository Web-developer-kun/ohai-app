import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const Buttons = ({ onImageUpload }) => (
  <div className="buttons fadein">
    <div className="button">
      <label htmlFor="single">
        <FontAwesomeIcon icon={faImage} color="#f0f0f0" size="2x" />
      </label>
      <div className="post-images">Post Images to Chat</div>
      <input
        type="file"
        id="single"
        style={{ display: "none" }}
        onChange={onImageUpload}
      />
    </div>
  </div>
);

export default Buttons;
