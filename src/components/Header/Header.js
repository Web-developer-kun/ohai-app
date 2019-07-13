import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Header = ({ pmUserName, setPmSid, setPmUserName }) => {
  return (
    <div id="townSquareHeader" className="row">
      <h3 className="col-4">PingIM</h3>
      {pmUserName && pmUserName.length ? (
        <div
          className="pm-notification-bar"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setPmSid("");
            setPmUserName("");
          }}
        >
          <div className="pm-alert" style={{ display: "inline-block" }}>
            Messaging {pmUserName}. (Click here to cancel):
          </div>
          <div style={{ "margin-left": "10px", display: "inline-block" }}>
            <FontAwesomeIcon className="pm-stop" icon={faTimes} size="1x" />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
