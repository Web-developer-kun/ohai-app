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
  changeRoute,
  setSessionCredentials,
  setComposeInput,
  setSfwScore,
  setNsfwScore,
  uploadImages,
  clearImageTray
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
    route: state.changeRoute.route,
    session_creds: state.setLoggedInCreds.session_creds,
    msgBox: state.setComposeInputField.msgBox,
    sfwScoreString: state.setSfwScoreResults.sfwScoreString,
    nsfwScoreString: state.setSfwScoreResults.nsfwScoreString,
    images: state.uploadImagesToCloudinary.images,
    uploading: state.uploadImagesToCloudinary.uploading
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
    changeRoute: text => dispatch(changeRoute(text)),
    setSessionCredentials: obj => dispatch(setSessionCredentials(obj)),
    onInputFieldChange: text => dispatch(setComposeInput(text)),
    setSFWScore: text => dispatch(setSfwScore(text)),
    setNSFWScore: text => dispatch(setNsfwScore(text)),
    onSelectImagesFromDisk: formData => dispatch(uploadImages(formData)),
    clearImageTray: array => dispatch(clearImageTray(array))
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
