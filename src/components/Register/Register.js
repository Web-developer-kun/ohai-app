import React from 'react';
import './register.css';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      setPass1: '',
      setPass2: '',
      passErr: '',
      password: null
    }
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onSetPass1 = (event) => {
    this.setState({setPass1: event.target.value})
  }

  onSetPass2 = (event) => {
    this.setState({setPass2: event.target.value})
  }

  checkPassword = () => {
    if(this.state.setPass1 === this.state.setPass2){
      this.setState({passErr: "Passwords Match"});
      this.setState({password: this.state.setPass2});
    } else if(this.state.setPass1 !== this.state.setPass2){
      this.setState({passErr: "Passwords Don't Match"});
      this.setState({password: ''});
    }
  }

   onSubmitRegister = () => {
     const { email, password } = this.state;
     if(email.length && password.length){
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
     } else {
        this.setState({passErr: "Complete the form"});
     }
  }

  render(){
    return(
      <div>
      <div className="text-center">
          <h1 className="h3 mb-3 font-weight-normal">Ohaii Sign Up</h1>
          <label htmlFor="inputEmail">Email address</label>
            <input
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              required=""
              autoFocus=""
              onChange={this.onEmailChange}
            />
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required=""
            onChange={this.onSetPass1}
            onBlur={this.checkPassword}
            />

          <label htmlFor="inputPassword">{this.state.passErr.length ? this.state.passErr : "Confirm Password" }</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            placeholder="Confirm Password"
            required=""
            onChange={this.onSetPass2}
            onBlur={this.checkPassword}
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
