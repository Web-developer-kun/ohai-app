import React from "react";
import OnlineUser from "./OnlineUser";

const OnlineUsers = ({ connectedSockets, setPmSid, setPmUserName }) => {
  return (
    <div id="active-users" className="col-2">
      <h4 id="online-users-header">ONLINE:</h4>
      {connectedSockets.map((cs, i) => {
        return (
          <OnlineUser
            key={i}
            username={cs.username}
            sid={cs.sid}
            setPmUserName={setPmUserName}
            setPmSid={setPmSid}
          />
        );
      })}
    </div>
  );
};

export default OnlineUsers;
