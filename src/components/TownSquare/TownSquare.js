import React from "react";
import OnlineUsers from "../OnlineUsers/OnlineUsers";
import ChatBox from "../ChatBox/ChatBox";
import MessageInput from "../MessageInput/MessageInput";
import ImageUploader from "../ImageUploader/ImageUploader";
import Modal from "../Modal/Modal";
import SignOut from "../SignOut/SignOut";
import "../townsquare.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

class TownSquare extends React.Component {
  render() {
    const { isModalOpen, setPmSid, setPmUserName, pmUserName } = this.props;
    return (
      <div className="container-fluid">
        {isModalOpen ? (
          <Modal>
            <ImageUploader {...this.props} />
          </Modal>
        ) : null}
        <div id="townSquareHeader" className="row">
          <h3 className="col-4">PingIM</h3>
          {pmUserName.length ? (
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

        <div className="row">
          <ChatBox {...this.props} />
          <OnlineUsers {...this.props} />
        </div>
        <MessageInput {...this.props} />
        <SignOut {...this.props} />
      </div>
    );
  }
}

export default TownSquare;
