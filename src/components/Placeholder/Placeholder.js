import React from "react";
import Message from "../Message/Message";

class Placeholder extends React.Component {
  constructor() {
    super();
    this.state = {
      msgBox: "",
      messages: []
    };
  }

  writeMessage = event => {
    this.setState({ msgBox: event.target.value });
  };

  postMessage = () => {
    const ms = new Date();
    const dateString = ms.toLocaleDateString() + " " + ms.toLocaleTimeString();
    const { msgBox } = this.state;
    const newChat = this.state.messages;
    newChat.push({
      user: "User123",
      message: msgBox,
      time: dateString,
      ms: ms
    });
    this.setState({ messages: newChat });
    this.setState({ msgBox: "" });
  };

  signOut = () => {
    const { changeRoute } = this.props;
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
