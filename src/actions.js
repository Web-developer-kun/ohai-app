import {
  SET_REGISTER_EMAIL,
  CHANGE_PASS_FIELD_1,
  CHANGE_PASS_FIELD_2,
  SET_PASS_ERR,
  SET_PASSWORD,
  SET_LOGIN_EMAIL,
  SET_LOGIN_PASSWORD,
  CHANGE_ROUTE
} from './constants'

//Register Page
export const setRegisterEmail = (text) => ({type: SET_REGISTER_EMAIL, payload: text})
export const setPassField1 = (text) => ({type: CHANGE_PASS_FIELD_1, payload: text})
export const setPassField2 = (text) => ({type: CHANGE_PASS_FIELD_2, payload: text})
export const setPassErr = (text) => ({type: SET_PASS_ERR, payload: text})
export const setPassword = (text) => ({type: SET_PASSWORD, payload: text})

//Signin Page
export const setLoginEmail = (text) => ({type: SET_LOGIN_EMAIL, payload: text})
export const setLoginPassword = (text) => ({type: SET_LOGIN_PASSWORD, payload: text})

//Routes
export const changeRoute = (text) => ({type: CHANGE_ROUTE, payload: text})
