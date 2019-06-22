import React from 'react';
import './sign-in.css';

class Signin extends React.Component {
  onSignIn = () => {
    const { signInEmail, signInPassword, changeRoute } = this.props;
     fetch('http://localhost:3000/signin', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             signInEmail: signInEmail,
             signInPassword: signInPassword
           })
         })
      .then(response => response.json())
      .then(changeRoute('placeholder'))
      .catch(err => console.log(err))
  }

  render(){
    const { onSignInEmailChange, onSignInPasswordChange } = this.props;
    return(
      <div>
      <div className="text-center">
          <h1 className="h3 mb-3 font-weight-normal">Ohaii Sign In</h1>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              required=""
              autoFocus=""
              onChange={onSignInEmailChange}
            />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required=""
            onChange={onSignInPasswordChange}
          />
          <div className="btn btn-block btn-social btn-google" style={{'color': '#fff'}}>
            <span className="fa fa-google"></span> Sign Up with Google
          </div>
          <div className="btn btn-block btn-social btn-facebook" style={{'color': '#fff'}}>
            <span className="fa fa-facebook"></span> Sign Up with Facebook
          </div>
      </div>
      <button
        onClick={this.onSignIn}
        className="btn btn-lg btn-primary btn-block"
      >Sign In</button>
      </div>
    )
  }
}

export default Signin;
