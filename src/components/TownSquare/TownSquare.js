import React from "react";
import OnlineUsers from "../OnlineUsers/OnlineUsers";
import ChatBox from "../ChatBox/ChatBox";
import MessageInput from "../MessageInput/MessageInput";
import ImageUploader from "../ImageUploader/ImageUploader";
import Modal from "../Modal/Modal";
import Header from "../Header/Header";
import SignOut from "../SignOut/SignOut";
import "../townsquare.css";

class TownSquare extends React.Component {
  render() {
    const { isModalOpen } = this.props;
    return (
      <div className="container-fluid">
        {isModalOpen ? (
          <Modal>
            <ImageUploader {...this.props} />
          </Modal>
        ) : null}
        <Header {...this.props} />
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
