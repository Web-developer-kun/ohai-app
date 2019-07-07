import React from "react";
import OnlineUser from "./OnlineUser";

const OnlineUsers = ({ connectedSockets, pmUser }) => {
  return (
    <div>
      {connectedSockets.map((cs, i) => {
        return (
          <OnlineUser
            key={i}
            username={cs.username}
            sid={cs.sid}
            pmUser={pmUser}
          />
        );
      })}
    </div>
  );
};

export default OnlineUsers;
