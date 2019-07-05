import React from "react";

const Message = ({ user, time, message, src }) => {
  if (src)
    return (
      <div>
        {" "}
        {user} posted: <img src={src} alt="" /> ({time}){" "}
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

export default Message;
