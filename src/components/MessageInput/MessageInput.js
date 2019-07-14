import React from "react";
import socketIOClient from "socket.io-client";
import _ from "underscore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPaperclip } from "@fortawesome/free-solid-svg-icons";

class MessageInput extends React.Component {
  constructor() {
    super();
    this.state = {
      socket: socketIOClient(`http://localhost:3000`),
      typingUsers: []
    };
  }

  componentDidMount() {
    const {
      pushPost,
      session_creds,
      setConnectedSockets,
      setSessionCredentials,
      changeRoute,
      setSocketForSignOut
    } = this.props;
    const { socket } = this.state;
    const time = new Date().toLocaleTimeString();

    setSocketForSignOut(socket);

    if (session_creds && session_creds.email) {
      socket.emit("add-user", session_creds.email);
    }

    socket.on("duplicate-login", () => {
      fetch("http://localhost:3000/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: window.sessionStorage.getItem("token")
        })
      })
        .then(response => response.json())
        .then(() => {
          setSessionCredentials({ email: "", id: "" });
          socket.emit("sign-out");
        })
        .then(window.sessionStorage.removeItem("token"))
        .then(changeRoute("signin"));
    });

    socket.on("receive-connected-sockets", connectedSockets => {
      setConnectedSockets(connectedSockets);
    });

    socket.on("user-typing", typingUser => {
      const { typingUsers } = this.state;
      if (typingUsers.includes(typingUser)) return;
      else
        this.setState({ typingUsers: [...this.state.typingUsers, typingUser] });
    });

    socket.on("user-stopped-typing", user => {
      const { typingUsers } = this.state;
      const newTypingUsers = typingUsers.filter((tu, i) => {
        return tu !== user;
      });
      this.setState({ typingUsers: newTypingUsers });
    });

    socket.on("receive-private-message", msg => {
      pushPost({
        user: msg.user,
        message: msg.message,
        src: msg.src,
        whisper: true,
        time: time
      });
    });

    socket.on("message-received", msg => {
      pushPost({
        user: msg.user,
        message: msg.message,
        src: msg.src,
        time: time
      });
    });
  }

  writeMessage = event => {
    const { onInputFieldChange } = this.props;
    onInputFieldChange(event.target.value);
  };

  emitTypingStatus = () => {
    const { socket } = this.state;
    const { session_creds } = this.props;
    socket.emit("typing", session_creds.email);
  };

  emitStoppedTyping = () => {
    const { socket } = this.state;
    const { session_creds } = this.props;
    socket.emit("stopped-typing", session_creds.email);
  };

  checkForEnterKey = event => {
    if (event.key === "Enter") this.postMessage();
  };

  postMessage = () => {
    const {
      session_creds,
      onInputFieldChange,
      imgUrl,
      msgBox,
      pmUserSid,
      setImageUrl
    } = this.props;
    if (!msgBox.length && !imgUrl.length) return;
    const ms = new Date();

    if (pmUserSid) {
      this.state.socket.emit("send-private-message", {
        user: session_creds.email,
        message: msgBox,
        src: imgUrl,
        time: ms,
        sid: pmUserSid
      });
      setImageUrl("");
    } else {
      this.state.socket.emit("post-message", {
        user: session_creds.email,
        message: msgBox,
        src: imgUrl,
        time: ms
      });
      setImageUrl("");
    }
    onInputFieldChange("");
  };

  render() {
    const {
      msgBox,
      toggleModal,
      imgUrl,
      pmUserName,
      setPmSid,
      setPmUserName
    } = this.props;
    return (
      <div id="messageInput" className="col">
        <div className="row">
          <div className="is-typing col">
            {this.state.typingUsers.length
              ? this.state.typingUsers.map((user, i) => {
                  return (
                    <div className="typing-user" key={i}>
                      {i > 0 ? "; " : ""}
                      {user} is typing{" "}
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
        <div className="row">
          {pmUserName && pmUserName.length ? (
            <div
              className="pm-notification-bar btn btn-lg btn-outline-warning btn-block"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setPmSid("");
                setPmUserName("");
              }}
            >
              Messaging {pmUserName}. (Click here to cancel):
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="row">
          <input
            type="text"
            onChange={this.writeMessage}
            className="form-control message col-8"
            onKeyDown={this.emitTypingStatus}
            onKeyUp={_.debounce(this.emitStoppedTyping, 5000)}
            onKeyPress={this.checkForEnterKey}
            value={msgBox && msgBox.length ? msgBox : ""}
          />
          <div
            id="openImageUploadModal"
            className="col-sm-auto"
            onClick={() => toggleModal(true)}
          >
            <FontAwesomeIcon icon={faImage} color="#f0f0f0" size="1x" />
          </div>
        </div>
        <div className="attachments">
          {imgUrl && imgUrl.length ? (
            <div>
              <FontAwesomeIcon icon={faPaperclip} color="#f0f0f0" size="1x" />
              <span className="img-attached">Image Attached</span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default MessageInput;
