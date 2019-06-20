import React from 'react';
import './register.css';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

   onSubmitRegister = () => {
     const { email, password } = this.state;
     fetch('http://localhost:3000/register', {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             email: email,
             password: password
           })
         })
         .then(response => response.json())
         .catch(err => console.log(err))
  }

  render(){
    return(
      <div>
      <div className="text-center">
          <h1 className="h3 mb-3 font-weight-normal">Ohaii Sign Up</h1>
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
            required=""/>
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            placeholder="Confirm Password"
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
        onClick={this.onSubmitRegister}
        className="btn btn-lg btn-primary btn-block"
      >Register</button>
      </div>
    )
  }
}

export default Register;
