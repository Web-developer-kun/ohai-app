import React from "react";
import OnlineUsers from "../OnlineUsers/OnlineUsers";
import ChatBox from "../ChatBox/ChatBox";
import MessageInput from "../MessageInput/MessageInput";
import ImageUploader from "../ImageUploader/ImageUploader";
import Modal from "../Modal/Modal";
import Header from "../Header/Header";
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
        <div className="row chat-box-container">
          <ChatBox {...this.props} />
          <OnlineUsers {...this.props} />
          <div class="w-100"></div>
          <MessageInput {...this.props} />
        </div>
      </div>
    );
  }
}

export default TownSquare;
