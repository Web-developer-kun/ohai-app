import React from "react";

const Message = ({ user, time, message }) => {
  return (
    <div>
      {user} says: {message} ({time})
    </div>
  );
};

export default Message;
