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
  setImageUrl,
  setSfwScore,
  setNsfwScore,
  uploadImages,
  clearImageTray,
  pushPost,
  setPmSid,
  setPmUserName,
  setConnectedSockets,
  toggleModal
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
    imgUrl: state.setComposeInputField.imgUrl,
    sfwScoreString: state.setSfwScoreResults.sfwScoreString,
    nsfwScoreString: state.setSfwScoreResults.nsfwScoreString,
    images: state.uploadImagesToCloudinary.images,
    uploading: state.uploadImagesToCloudinary.uploading,
    posts: state.pushPostsToChatBox.posts,
    pmUserSid: state.setPmCreds.pmUserSid,
    pmUserName: state.setPmCreds.pmUserName,
    connectedSockets: state.setConnectedSockets.connectedSockets,
    isModalOpen: state.toggleModal.isModalOpen
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
    setImageUrl: text => dispatch(setImageUrl(text)),
    setSFWScore: text => dispatch(setSfwScore(text)),
    setNSFWScore: text => dispatch(setNsfwScore(text)),
    onSelectImagesFromDisk: formData => dispatch(uploadImages(formData)),
    clearImageTray: array => dispatch(clearImageTray(array)),
    pushPost: obj => dispatch(pushPost(obj)),
    setPmSid: text => dispatch(setPmSid(text)),
    setPmUserName: text => dispatch(setPmUserName(text)),
    setConnectedSockets: array => dispatch(setConnectedSockets(array)),
    toggleModal: boolean => dispatch(toggleModal(boolean))
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
