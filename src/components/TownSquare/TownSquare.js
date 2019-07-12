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
        <div id="townSquareHeader" className="row">
          <h3 className="col-3">PingIM</h3>
          <p className="col-sm-auto">(＾Ｕ＾)ノ~ＹＯ</p>
        </div>
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
