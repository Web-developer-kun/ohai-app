import React from "react";

const Post = ({ user, time, message, whisper, src, rgb, from, to }) => {
  if (!whisper) {
    return (
      <div className="post">
        <div>
          <div className="user" style={{ color: rgb }}>
            {user} says:
          </div>
          <div className="post-content">
            {message} <span className="time"> ({time}) </span>{" "}
          </div>
          {src ? <img src={src} alt="" className="posted-image" /> : ""}
        </div>
      </div>
    );
  } else {
    return (
      <div className="post">
        <div>
          <div className="user" style={{ color: "#ffc107" }}>
            From: {from} To: {to}:
          </div>
          <div className="post-content">
            {message} <span className="time"> ({time}) </span>{" "}
          </div>
          {src ? <img src={src} alt="" className="posted-image" /> : ""}
        </div>
      </div>
    );
  }
};

export default Post;
