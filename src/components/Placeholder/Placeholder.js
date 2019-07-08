import React from "react";
import Post from "../Post/Post";
import Spinner from "../Spinner";
import Images from "../Images";
import Buttons from "../Buttons";
import OnlineUsers from "../OnlineUsers";
import socketIOClient from "socket.io-client";
import _ from "underscore";

class Placeholder extends React.Component {
  constructor() {
    super();
    this.state = {
      socket: socketIOClient(`http://localhost:3000`),
      connectedSockets: [],
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

  onImageUpload = event => {
    const { onSelectImagesFromDisk } = this.props;
    const files = Array.from(event.target.files);
    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, file);
    });
    onSelectImagesFromDisk(formData);
  };

  scanImage = url => {
    const { setSFWScore, setNSFWScore } = this.props;
    fetch("http://localhost:3000/image-scan", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        url: url
      })
    })
      .then(response => response.json())
      .then(data => {
        const sfwScores = this.processClarifaiData(data);
        if (sfwScores.nsfw.score > 0.8) {
          setNSFWScore(
            sfwScores.nsfw.score * 100 +
              " %  Warning: the bot moderator thinks this is NSFW"
          );
          setSFWScore("");
        } else {
          setSFWScore(
            sfwScores.sfw.score * 100 + " % chance this image is SFW"
          );
          setNSFWScore(
            sfwScores.nsfw.score * 100 + " %  chance this image is NSFW"
          );
        }
      });
  };

  postImage = url => {
    const { session_creds } = this.props;
    this.state.socket.emit("post-image", {
      user: session_creds.email,
      src: url,
      time: new Date()
    });
    this.removeImage();
  };

  processClarifaiData = data => {
    const concepts = data.outputs[0].data.concepts;
    const results = {
      nsfw: {},
      sfw: {}
    };

    for (var i = 0; i < concepts.length; i++) {
      if (concepts[i].name === "sfw") {
        results.sfw.score = concepts[i].value;
      } else if (concepts[i].name === "nsfw") {
        results.nsfw.score = concepts[i].value;
      }
    }
    return results;
  };

  removeImage = id => {
    const { clearImageTray, setSFWScore, setNSFWScore } = this.props;
    clearImageTray([]);
    setSFWScore("");
    setNSFWScore("");
  };

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
    const {
      uploading,
      images,
      posts,
      msgBox,
      sfwScoreString,
      nsfwScoreString,
      connectedSockets,
      setPmSid,
      setPmUserName,
      pmUserSid,
      pmUserName
    } = this.props;

    const imageUploader = () => {
      switch (true) {
        case uploading:
          return <Spinner />;
        case images !== undefined && images.length > 0:
          return (
            <Images
              images={images}
              removeImage={this.removeImage}
              scanImage={this.scanImage}
              postImage={this.postImage}
              sfwScoreString={sfwScoreString}
              nsfwScoreString={nsfwScoreString}
            />
          );
        default:
          return <Buttons onImageUpload={this.onImageUpload} />;
      }
    };
    return (
      <div>
        <div
          style={{ height: "500px", overflow: "scroll" }}
          className="form-control"
        >
          {posts
            ? posts.map((pst, i) => {
                return (
                  <Post
                    key={i}
                    user={pst.user}
                    message={pst.message}
                    whisper={pst.whisper}
                    src={pst.src}
                    time={pst.time}
                  />
                );
              })
            : ""}
        </div>
        <OnlineUsers
          connectedSockets={connectedSockets}
          setPmSid={setPmSid}
          setPmUserName={setPmUserName}
        />
        <div>
          {pmUserSid && pmUserName && pmUserSid.length && pmUserName.length ? (
            <span
              className="btn btn-lg btn-warning"
              onClick={() => {
                setPmUserName("");
                setPmSid("");
              }}
            >
              Private Message {pmUserName} X
            </span>
          ) : (
            ""
          )}
        </div>
        <input
          type="text"
          onChange={this.writeMessage}
          className="form-control message"
          onKeyDown={this.emitTypingStatus}
          onKeyUp={_.debounce(this.emitStoppedTyping, 5000)}
          onKeyPress={this.checkForEnterKey}
          value={msgBox && msgBox.length ? msgBox : ""}
        />
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
        <div className="buttons">{imageUploader()}</div>
        <span style={{ display: "block" }}>
          {sfwScoreString ? sfwScoreString : ""}
        </span>
        <span style={{ display: "block" }}>
          {nsfwScoreString ? nsfwScoreString : ""}
        </span>
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
