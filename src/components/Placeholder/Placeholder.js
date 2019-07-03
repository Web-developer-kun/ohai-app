import React from "react";
import Message from "../Message/Message";
import socketIOClient from "socket.io-client";

class Placeholder extends React.Component {
  constructor() {
    super();
    this.state = {
      msgBox: "",
      messages: [],
      socket: socketIOClient("http://localhost:3000/")
    };
  }

  componentDidMount() {
    this.state.socket.on("message-received", msg => {
      const time = new Date().toLocaleTimeString();
      const newChat = this.state.messages;
      newChat.push({
        user: msg.user,
        message: msg.message,
        time: time
      });
      this.setState({ messages: newChat });
      this.setState({ msgBox: "" });
    });
  }

  writeMessage = event => {
    this.setState({ msgBox: event.target.value });
  };

  postMessage = () => {
    const { session_creds } = this.props;
    const ms = new Date();

    const { msgBox } = this.state;

    this.state.socket.emit("post-message", {
      user: session_creds.email,
      message: msgBox,
      time: ms
    });
  };

  signOut = () => {
    const { changeRoute, setSessionCredentials } = this.props;
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
      .then(setSessionCredentials({ email: "", id: "" }))
      .then(window.sessionStorage.removeItem("token"))
      .then(changeRoute("signin"));
  };
  render() {
    const { messages, msgBox } = this.state;
    return (
      <div>
        <div style={{ height: "500px" }} className="form-control">
          {messages
            ? messages.map((msg, i) => {
                return (
                  <Message
                    key={i}
                    user={msg.user}
                    message={msg.message}
                    time={msg.time}
                  />
                );
              })
            : ""}
        </div>
        <input
          type="text"
          onChange={this.writeMessage}
          className="form-control message"
          value={msgBox.length ? msgBox : ""}
        />
        <button
          className="btn btn-lg btn-primary btn-block"
          onClick={this.postMessage}
        >
          {" "}
          Send
        </button>
        <button
          onClick={this.signOut}
          className="btn btn-lg btn-primary btn-block"
        >
          Sign Out
        </button>
      </div>
    );
  }
}

export default Placeholder;
