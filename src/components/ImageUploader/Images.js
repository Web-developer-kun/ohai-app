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
      <div
        onClick={() => removeImage(image.public_id)}
        className="btn btn-sm btn-outline-light btn-block"
      >
        Nah this meme sucks. I'll post something else.
      </div>
      <div
        onClick={() => scanImage(image.secure_url)}
        className="btn btn-sm btn-outline-light btn-block"
      >
        Ready to test if this is SFW?
      </div>
    </div>
  ));

export default Images;
