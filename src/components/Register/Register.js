import React from "react";
import "../signin-register.css";

class Register extends React.Component {
  checkPassword = () => {
    const { setFormErrMsg, setPassword, setPass1, setPass2 } = this.props;
    if (setPass1 === setPass2) {
      setFormErrMsg("");
      setPassword(setPass2);
    } else if (setPass1 !== setPass2) {
      setFormErrMsg("Passwords Must Match");
      setPassword("");
    }
  };

  saveAuthTokenID = token => {
    window.sessionStorage.setItem("token", token);
  };

  onSubmitRegister = () => {
    this.checkPassword();
    const {
      email,
      password,
      setFormErrMsg,
      changeRoute,
      setSessionCredentials
    } = this.props;
    if (email.length && password.length) {
      fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(response => response.json())
        .then(data => {
          if (data === "User already exists") {
            setFormErrMsg("User already exists");
          }
          if (data.userId) {
            window.sessionStorage.setItem("token", data.token);
            fetch(`http://localhost:3000/townsquare/${data.userId}`, {
              method: "get",
              headers: {
                "Content-Type": "application/json",
                Authorization: data.token
              }
            })
              .then(response => response.json())
              .then(user => {
                setSessionCredentials({ email: user.email, id: user._id });
                setFormErrMsg("");
                changeRoute("townsquare");
              });
          }
        })
        .catch(err => console.log(err));
    } else {
      setFormErrMsg("Complete the form");
    }
  };

  navigateToSignIn = () => {
    const {
      onEmailChange,
      onSetPass1,
      onSetPass2,
      setFormErrMsg,
      setPassword,
      changeRoute
    } = this.props;
    const empty = { target: { value: "" } };
    onEmailChange(empty);
    onSetPass1(empty);
    onSetPass2(empty);
    setPassword("");
    setFormErrMsg("");
    changeRoute("signin");
  };

  render() {
    const { onEmailChange, onSetPass1, onSetPass2, formErrMsg } = this.props;

    return (
      <div className="container">
        <div className="login-form">
          <div className="text-center">
            <h1 className="h1 mb-3 font-weight-normal header-logo">PingIM</h1>
            <label className="form-err">
              {formErrMsg.length ? formErrMsg : ""}
            </label>
            <input
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              required=""
              autoFocus=""
              onChange={onEmailChange}
            />
            <input
              type="password"
              id="inputPassword"
              className="form-control"
              placeholder="Password"
              required=""
              onChange={onSetPass1}
              onBlur={this.checkPassword}
            />
            <input
              type="password"
              id="confirmPassword"
              className="form-control"
              placeholder="Confirm Password"
              required=""
              onChange={onSetPass2}
              onBlur={this.checkPassword}
            />
          </div>

          <button
            onClick={this.onSubmitRegister}
            className="btn btn-lg btn-outline-warning btn-block register"
          >
            Register
          </button>
          <button
            onClick={() => {
              this.navigateToSignIn();
            }}
            className="btn btn-lg btn-link signin btn-block"
          >
            Have an account?
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
