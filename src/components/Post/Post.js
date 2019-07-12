import React from "react";

const Post = ({ user, time, message, whisper, src }) => {
  return (
    <div className="post">
      <div>
        <div className="user" style={{ display: "block" }}>
          {user} {whisper ? "whispers" : "says"}:
        </div>
        <div className="post-content" style={{ display: "block" }}>
          {message} <span className="time"> ({time}) </span>{" "}
        </div>
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
