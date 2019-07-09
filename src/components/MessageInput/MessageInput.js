import React from "react";
import socketIOClient from "socket.io-client";
import _ from "underscore";

class MessageInput extends React.Component {
  constructor() {
    super();
    this.state = {
      socket: socketIOClient(`http://localhost:3000`),
      typingUsers: []
    };
  }

  componentDidMount() {
    const { pushPost, session_creds, setConnectedSockets } = this.props;
    const { socket } = this.state;
    const time = new Date().toLocaleTimeString();

    if (session_creds && session_creds.email) {
      socket.emit("add-user", session_creds.email);
    }

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
        whisper: true,
        time: time
      });
    });
    socket.on("message-received", msg => {
      pushPost({
        user: msg.user,
        message: msg.message,
        time: time
      });
    });

    socket.on("image-received", imgpost => {
      pushPost({
        user: imgpost.user,
        src: imgpost.src,
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
    const { session_creds, onInputFieldChange } = this.props;
    const ms = new Date();

    const { msgBox, pmUserSid } = this.props;

    if (pmUserSid) {
      this.state.socket.emit("send-private-message", {
        user: session_creds.email,
        message: msgBox,
        time: ms,
        sid: pmUserSid
      });
    } else {
      this.state.socket.emit("post-message", {
        user: session_creds.email,
        message: msgBox,
        time: ms
      });
    }
    onInputFieldChange("");
  };

  render() {
    const {
      msgBox,
      setPmSid,
      setPmUserName,
      pmUserSid,
      pmUserName
    } = this.props;

    const { socket } = this.state;

    return (
      <div>
        <input
          type="text"
          onChange={this.writeMessage}
          className="form-control message"
          onKeyDown={this.emitTypingStatus}
          onKeyUp={_.debounce(this.emitStoppedTyping, 5000)}
          onKeyPress={this.checkForEnterKey}
          value={msgBox && msgBox.length ? msgBox : ""}
          style={{ display: "inline-block", width: "70%" }}
        />
        {pmUserSid.length && pmUserSid !== socket.id ? (
          <span
            className="btn btn-lg btn-warning"
            onClick={() => {
              setPmUserName("");
              setPmSid("");
            }}
            style={{ display: "inline-block" }}
          >
            To: {pmUserName} X
          </span>
        ) : (
          ""
        )}
        <div style={{ height: "50px" }}>
          {this.state.typingUsers.length
            ? this.state.typingUsers.map((user, i) => {
                return <span key={i}>{user} is typing</span>;
              })
            : ""}
        </div>
        <button
          className="btn btn-lg btn-primary btn-block"
          onClick={this.postMessage}
        >
          {" "}
          Send
        </button>
      </div>
    );
  }
}

export default MessageInput;
