import React from "react";

const Post = ({ user, time, message, src }) => {
  if (src)
    return (
      <div>
        <div> {user} posted: </div>
        <img
          style={{
            maxHeight: "512px",
            maxWidth: "512px",
            display: "block"
          }}
          src={src}
          alt=""
        />
        <span style={{ display: "block" }}>({time})</span>
      </div>
    );
  else
    return (
      <div>
        {" "}
        {user} says: {message} ({time}){" "}
      </div>
    );
};

export default Post;
