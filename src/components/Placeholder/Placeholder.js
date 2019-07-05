import React from "react";
import Post from "../Post/Post";
import Spinner from "../Spinner";
import Images from "../Images";
import Buttons from "../Buttons";
import socketIOClient from "socket.io-client";

class Placeholder extends React.Component {
  constructor() {
    super();
    this.state = {
      uploading: false,
      images: [],
      posts: [],
      socket: socketIOClient("http://localhost:3000/")
    };
  }

  componentDidMount() {
    const { onInputFieldChange } = this.props;
    const time = new Date().toLocaleTimeString();
    const newChat = this.state.posts;

    this.state.socket.on("message-received", msg => {
      newChat.push({
        user: msg.user,
        message: msg.message,
        time: time
      });
      this.setState({ posts: newChat });
      onInputFieldChange("");
    });

    this.state.socket.on("image-received", imgpost => {
      newChat.push({
        user: imgpost.user,
        src: imgpost.src,
        time: time
      });
      this.setState({ posts: newChat });
    });
  }

  onImageUpload = event => {
    const files = Array.from(event.target.files);
    this.setState({ uploading: true });

    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, file);
    });

    fetch(`http://localhost:3000/image-upload`, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(images => {
        this.setState({
          uploading: false,
          images
        });
      });
  };

  postImage = url => {
    const { session_creds } = this.props;
    this.state.socket.emit("post-image", {
      user: session_creds.email,
      src: url,
      time: new Date()
    });
  };

  removeImage = id => {
    this.setState({
      images: this.state.images.filter(image => image.public_id !== id)
    });
  };

  writeMessage = event => {
    const { onInputFieldChange } = this.props;
    onInputFieldChange(event.target.value);
  };

  checkForEnterKey = event => {
    if (event.key === "Enter") this.postMessage();
  };

  postMessage = () => {
    const { session_creds } = this.props;
    const ms = new Date();

    const { msgBox } = this.props;

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
    const { posts, uploading, images } = this.state;
    const { msgBox } = this.props;

    const imageUploader = () => {
      switch (true) {
        case uploading:
          return <Spinner />;
        case images.length > 0:
          return (
            <Images
              images={images}
              removeImage={this.removeImage}
              postImage={this.postImage}
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
                    src={pst.src}
                    time={pst.time}
                  />
                );
              })
            : ""}
        </div>
        <input
          type="text"
          onChange={this.writeMessage}
          className="form-control message"
          onKeyPress={this.checkForEnterKey}
          value={msgBox && msgBox.length ? msgBox : ""}
        />
        <button
          className="btn btn-lg btn-primary btn-block"
          onClick={this.postMessage}
        >
          {" "}
          Send
        </button>
        <div className="buttons">{imageUploader()}</div>
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
