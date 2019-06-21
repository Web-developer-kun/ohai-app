import React from 'react';
import { connect } from 'react-redux';
import { setRegisterEmail, setPassField1, setPassField2, setPassErr, setPassword, setLoginEmail, setLoginPassword, changeRoute } from './actions';
import './App.css';
import './bootstrap-social.css';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Placeholder from './components/Placeholder/Placeholder';

const mapStateToProps = (state) => {
  return {
    email: state.fillRegisterForm.email,
    setPass1: state.fillRegisterForm.setPass1,
    setPass2: state.fillRegisterForm.setPass2,
    passErr: state.fillRegisterForm.passErr,
    password: state.fillRegisterForm.password,
    signInEmail: state.fillSigninForm.signInEmail,
    signInPassword: state.fillSigninForm.signInPassword,
    route: state.changeRoute.route
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onEmailChange: (event) => dispatch(setRegisterEmail(event.target.value)),
    onSetPass1: (event) => dispatch(setPassField1(event.target.value)),
    onSetPass2: (event) => dispatch(setPassField2(event.target.value)),
    setPassErr: (text) => dispatch(setPassErr(text)),
    setPassword: (text) => dispatch(setPassword(text)),
    onSignInEmailChange: (event) => dispatch(setLoginEmail(event.target.value)),
    onSignInPasswordChange: (event) => dispatch(setLoginPassword(event.target.value)),
    changeRoute: (text) => dispatch(changeRoute(text))
  }
}


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      route: 'signin'
    }
  }


  render(){
    const { route } = this.state;
    return (
      <div style={{'width': '100%', 'height': '100%'}}>
        { route === "signin" ? <Signin {...this.props}/> : '' }
        { route === "register" ? <Register {...this.props}/> : ''}
        { route === "placeholder" ? <Placeholder/> : ''}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
