import React from "react";

class SignOut extends React.Component {
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
    return (
      <button
        onClick={this.signOut}
        className="btn btn-lg btn-primary btn-block"
      >
        Sign Out
      </button>
    );
  }
}

export default SignOut;
