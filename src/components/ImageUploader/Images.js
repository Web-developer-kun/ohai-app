import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faRobot } from "@fortawesome/free-solid-svg-icons";

const Images = ({
  images,
  removeImage,
  scanImage,
  postImage,
  sfwScoreString,
  nsfwScoreString
}) =>
  images.map((image, i) => (
    <div key={i} className="fadein">
      <div
        onClick={() => removeImage(image.public_id)}
        style={{ display: "inline-block", "margin-right": "5px" }}
        className="delete"
      >
        <FontAwesomeIcon icon={faTimesCircle} size="2x" color="#f0f0f0" />
      </div>
      <div
        onClick={() => scanImage(image.secure_url)}
        style={{ display: "inline-block", "margin-left": "5px" }}
        className="upload"
      >
        <FontAwesomeIcon icon={faRobot} size="2x" color="#f0f0f0" />
      </div>
      <img
        style={{
          maxHeight: "250px",
          maxWidth: "250px",
          display: "block",
          "border-radius": "5px"
        }}
        src={image.secure_url}
        alt=""
      />
    </div>
  ));

export default Images;
