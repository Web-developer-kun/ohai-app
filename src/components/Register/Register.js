import React from 'react';
import './register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
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
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    }).then(response => response.json()).then(data => {
      console.log(data);
    })
  }

  render(){
    return(
      <div className="text-center" style={{'width': '300px'}}>
        <form className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal">Ohaii Sign Up</h1>
          <label for="inputEmail" className="sr-only">Email address</label>
            <input
              type="email"
              id="inputEmail"
              className="form-control"
              placeholder="Email address"
              required=""
              autofocus=""
              onChange={this.onEmailChange}
            />
          <label for="inputPassword" className="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required=""/>
          <label for="inputPassword" className="sr-only">Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            placeholder="Confirm Password"
            required=""
            onChange={this.onPasswordChange}
          />
          <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
          <div className="btn btn-block btn-social btn-google" style={{'color': '#fff'}}>
            <span className="fa fa-google"></span> Sign Up with Google
          </div>
          <div className="btn btn-block btn-social btn-facebook" style={{'color': '#fff'}}>
            <span className="fa fa-facebook"></span> Sign Up with Facebook
          </div>
          <button
            onClick={this.onSubmitRegister}
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            >Register</button>
            <p className="mt-5 mb-3 text-muted">© 2019</p>
          </form>
      </div>
    )
  }
}

export default Register;
