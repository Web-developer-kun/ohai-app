import React from "react";

const Post = ({ user, time, message, whisper, src }) => {
  return (
    <div className="post">
      <div>
        <div className="user">
          {user} {whisper ? "whispers" : "says"}:
        </div>
        <div className="post-content">
          {message} <span className="time"> ({time}) </span>{" "}
        </div>
        {src ? <img src={src} alt="" className="posted-image" /> : ""}
      </div>
    </div>
  );
};

export default Post;
