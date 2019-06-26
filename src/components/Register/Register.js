import React from 'react';
import './register.css';

class Register extends React.Component {
  checkPassword = () => {
    const { setPassErr, setPassword, setPass1, setPass2 } = this.props;
    if(setPass1 === setPass2){
      setPassErr("Passwords Match");
      setPassword(setPass2);
    } else if(setPass1 !== setPass2){
      setPassErr("Passwords Don't  Match");
      setPassword("");
    }
  }

  saveAuthTokenID = (token) => {
    window.sessionStorage.setItem('token', token);
  }

   onSubmitRegister = () => {
     this.checkPassword();
     const { email, password, setPassErr, changeRoute } = this.props;
     if(email.length && password.length){
       fetch('http://localhost:3000/register', {
             method: 'POST',
             headers: {
               'Content-Type': 'application/json'
             },
             body: JSON.stringify({
               email: email,
               password: password
             })
           })
           .then(response => response.json())
           .then(data => {
             if(data.userId){
               this.saveAuthTokenID(data.token);
               fetch(`http://localhost:3000/placeholder/${data.userId}`, {
                 method: 'get',
                 headers: {
                   'Content-Type': 'application/json',
                   'Authorization': data.token
                 }
               }).then(response => response.json())
              .then(data => { console.log(data); changeRoute('placeholder')})
             }
           })
           .catch(err => console.log(err))
     } else {
        setPassErr("Complete the form");
     }
  }

  render(){
    const { onEmailChange, onSetPass1, onSetPass2, passErr } = this.props;

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
              onChange={onEmailChange}
            />
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required=""
            onChange={onSetPass1}
            onBlur={this.checkPassword}
            />

          <label htmlFor="inputPassword">{ passErr.length ? passErr : "Confirm Password" }</label>
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
        className="btn btn-lg btn-primary btn-block"
      >Register</button>
      </div>
    )
  }
}

export default Register;
