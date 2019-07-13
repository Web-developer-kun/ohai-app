import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const Buttons = ({ onImageUpload, toggleModal }) => (
  <div className="upload-images-button">
    <label htmlFor="single" className="upload-images-button-icon">
      <FontAwesomeIcon icon={faImage} color="#f0f0f0" size="3x" />
    </label>
    <span className="post-images-to-chat">Post Images to Chat</span>
    <input type="file" id="single" onChange={onImageUpload} />
    <div
      className="btn btn-sm btn-link btn-block"
      onClick={() => {
        toggleModal(false);
      }}
    >
      Cancel
    </div>
  </div>
);

export default Buttons;
