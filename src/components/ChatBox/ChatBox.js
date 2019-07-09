import React, { useRef, useEffect } from "react";
import Post from "../Post/Post";

const ChatBox = ({ posts }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [posts]);

  return (
    <div style={{ height: "500px", overflow: "auto" }} className="form-control">
      {posts
        ? posts.map((pst, i) => {
            return (
              <Post
                key={i}
                user={pst.user}
                message={pst.message}
                whisper={pst.whisper}
                src={pst.src}
                time={pst.time}
              />
            );
          })
        : ""}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatBox;
