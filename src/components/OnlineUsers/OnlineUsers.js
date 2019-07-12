import React from "react";
import OnlineUser from "./OnlineUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const OnlineUsers = ({
  connectedSockets,
  setPmSid,
  setPmUserName,
  pmUserName,
  session_creds
}) => {
  return (
    <div id="active-users" className="col-md-auto">
      <h6 id="online-users-header">Online:</h6>
      {pmUserName.length ? (
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            setPmSid("");
            setPmUserName("");
          }}
        >
          <div className="pm-alert" style={{ display: "inline-block" }}>
            Messaging {pmUserName}
          </div>
          <div style={{ "margin-left": "10px", display: "inline-block" }}>
            <FontAwesomeIcon className="pm-stop" icon={faTimes} size="1x" />
          </div>
        </div>
      ) : (
        ""
      )}
      {connectedSockets.map((cs, i) => {
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
      })}
    </div>
  );
};

export default OnlineUsers;
