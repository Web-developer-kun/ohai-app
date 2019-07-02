import React from "react";
import { connect } from "react-redux";
import {
  setRegisterEmail,
  setPassField1,
  setPassField2,
  setFormErrMsg,
  setPassword,
  setLoginEmail,
  setLoginPassword,
  changeRoute
} from "./actions";
import "./bootstrap-social.css";
import Router from "./components/Router/Router";

const mapStateToProps = state => {
  return {
    email: state.fillRegisterForm.email,
    setPass1: state.fillRegisterForm.setPass1,
    setPass2: state.fillRegisterForm.setPass2,
    formErrMsg: state.fillRegisterForm.formErrMsg,
    password: state.fillRegisterForm.password,
    signInEmail: state.fillSigninForm.signInEmail,
    signInPassword: state.fillSigninForm.signInPassword,
    route: state.changeRoute.route
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onEmailChange: event => dispatch(setRegisterEmail(event.target.value)),
    onSetPass1: event => dispatch(setPassField1(event.target.value)),
    onSetPass2: event => dispatch(setPassField2(event.target.value)),
    setFormErrMsg: text => dispatch(setFormErrMsg(text)),
    setPassword: text => dispatch(setPassword(text)),
    onSignInEmailChange: event => dispatch(setLoginEmail(event.target.value)),
    onSignInPasswordChange: event =>
      dispatch(setLoginPassword(event.target.value)),
    changeRoute: text => dispatch(changeRoute(text))
  };
};

class App extends React.Component {
  render() {
    return <Router {...this.props} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
