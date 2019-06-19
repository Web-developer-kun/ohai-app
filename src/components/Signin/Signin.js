import React from 'react';
import './sign-in.css';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value})
  }

  onSignIn = () => {
     fetch('http://localhost:3000/register', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             email: this.state.email,
             password: this.state.password
           })
         })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  render(){
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
              onChange={this.onEmailChange}
            />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required=""
            onChange={this.onPasswordChange}
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
