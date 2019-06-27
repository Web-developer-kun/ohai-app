import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { setRegisterEmail, setPassField1, setPassField2, setFormErrMsg, setPassword, setLoginEmail, setLoginPassword, changeRoute } from './actions';
import './App.css';
import './bootstrap-social.css';
const Signin = React.lazy(() => import('./components/Signin/Signin'))
const Register = React.lazy(() => import('./components/Register/Register'))
const Placeholder = React.lazy(() => import('./components/Placeholder/Placeholder'))

const mapStateToProps = (state) => {
  return {
    email: state.fillRegisterForm.email,
    setPass1: state.fillRegisterForm.setPass1,
    setPass2: state.fillRegisterForm.setPass2,
    formErrMsg: state.fillRegisterForm.formErrMsg,
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
    setFormErrMsg: (text) => dispatch(setFormErrMsg(text)),
    setPassword: (text) => dispatch(setPassword(text)),
    onSignInEmailChange: (event) => dispatch(setLoginEmail(event.target.value)),
    onSignInPasswordChange: (event) => dispatch(setLoginPassword(event.target.value)),
    changeRoute: (text) => dispatch(changeRoute(text))
  }
}


class App extends React.Component {
  render(){
    const { route } = this.props;
    if(route === 'signin'){
      return(
        <div style={{'width': '100%', 'height': '100%'}}>
          <Suspense fallback={<h1>Signin</h1>}>
            <Signin {...this.props}/>
          </Suspense>
        </div>
      )
    } else if(route === 'register'){
      return(
        <div style={{'width': '100%', 'height': '100%'}}>
          <Suspense fallback={<h1>Register</h1>}>
            <Register {...this.props}/>
          </Suspense>
        </div>
      )
    } else if(route === 'placeholder'){
      return(
        <div style={{'width': '100%', 'height': '100%'}}>
          <Suspense fallback={<h1>Register</h1>}>
            <Placeholder {...this.props}/>
          </Suspense>
        </div>
      )
    }
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
