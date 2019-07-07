import React from "react";

const OnlineUser = ({ username, sid, pmUser }) => {
  return (
    <div sid={sid} onClick={pmUser}>
      {username}
    </div>
  );
};

export default OnlineUser;
