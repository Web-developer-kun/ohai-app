import React from "react";
import OnlineUser from "./OnlineUser";
import SignOut from "../SignOut/SignOut";

const OnlineUsers = ({
  connectedSockets,
  setPmSid,
  setPmUserName,
  pmUserName,
  session_creds,
  changeRoute,
  setSessionCredentials,
  socket,
  setImageUrl
}) => {
  return (
    <div id="activeUsers" className="col-md-auto">
      <h6 id="online-users-header">Online:</h6>
      {connectedSockets.map((cs, i) => {
        if (cs.username && cs.sid) {
          return (
            <OnlineUser
              key={i}
              username={cs.username}
              sid={cs.sid}
              setPmUserName={setPmUserName}
              setPmSid={setPmSid}
              currentUser={session_creds.email}
            />
          );
        } else {
          return "";
        }
      })}
      <SignOut
        changeRoute={changeRoute}
        setSessionCredentials={setSessionCredentials}
        socket={socket}
        setImageUrl={setImageUrl}
      />
    </div>
  );
};

export default OnlineUsers;
