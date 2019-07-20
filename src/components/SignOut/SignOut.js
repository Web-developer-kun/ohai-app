import React from "react";

class SignOut extends React.Component {
  signOut = () => {
    const { changeRoute, setSessionCredentials, socket } = this.props;

    fetch("https://pingim-backend.herokuapp.com/signout", {
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
  };

  render() {
    return (
      <button
        onClick={this.signOut}
        className="btn btn-lg btn-link"
        id="signOut"
      >
        Sign Out
      </button>
    );
  }
}

export default SignOut;
