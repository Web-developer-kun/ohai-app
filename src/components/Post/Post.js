import React from "react";

const Post = ({ user, time, message, whisper, src }) => {
  console.log(src);
  return (
    <div>
      <div>
        {" "}
        {user} {whisper ? "whispers" : "says"} : {message} ({time}){" "}
        {src ? (
          <img
            style={{ maxHeight: "512px", maxWidth: "512px", display: "block" }}
            src={src}
            alt=""
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Post;
