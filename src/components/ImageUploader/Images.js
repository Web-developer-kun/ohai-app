import React from "react";

const Images = ({
  images,
  removeImage,
  scanImage,
  postImage,
  sfwScoreString,
  nsfwScoreString
}) =>
  images.map((image, i) => (
    <div key={i} className="image-in-tray">
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
        className="btn btn-sm btn-link btn-block"
      >
        Delet Dis (╯‵□′)╯︵┻━┻
      </div>
      <div
        onClick={() => scanImage(image.secure_url)}
        className="btn btn-sm btn-link btn-block"
      >
        Deploy the Memes (⌐■_■)
      </div>
    </div>
  ));

export default Images;
