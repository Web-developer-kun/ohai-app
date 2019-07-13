import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const Buttons = ({ onImageUpload }) => (
  <div className="buttons fadein">
    <div className="button">
      <label htmlFor="single" style={{ cursor: "pointer" }}>
        <FontAwesomeIcon icon={faImage} color="#f0f0f0" size="3x" />
      </label>
      <span className="post-images-to-chat">Post Images to Chat</span>
      <input type="file" id="single" onChange={onImageUpload} />
    </div>
  </div>
);

export default Buttons;
