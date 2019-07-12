import React from "react";
import OnlineUsers from "../OnlineUsers/OnlineUsers";
import ChatBox from "../ChatBox/ChatBox";
import MessageInput from "../MessageInput/MessageInput";
import ImageUploader from "../ImageUploader/ImageUploader";
import SignOut from "../SignOut/SignOut";
import "../townsquare.css";

class TownSquare extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <ChatBox {...this.props} />
          <OnlineUsers {...this.props} />
        </div>
        <MessageInput {...this.props} />
        <ImageUploader {...this.props} />
        <SignOut {...this.props} />
      </div>
    );
  }
}

export default TownSquare;
