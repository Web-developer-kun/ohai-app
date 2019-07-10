import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faArrowCircleUp
} from "@fortawesome/free-solid-svg-icons";

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
      <div onClick={() => removeImage(image.public_id)} className="delete">
        <FontAwesomeIcon icon={faTimesCircle} size="2x" />
      </div>
      <div onClick={() => scanImage(image.secure_url)} className="upload">
        <FontAwesomeIcon icon={faArrowCircleUp} size="2x" />
      </div>
      <img
        style={{ maxHeight: "250px", maxWidth: "250px" }}
        src={image.secure_url}
        alt=""
      />
    </div>
  ));

export default Images;
