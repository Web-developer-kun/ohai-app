import {
  CHANGE_PASS_FIELD_1,
  CHANGE_PASS_FIELD_2,
  SET_PASSWORD,
  SET_PASS_ERR,
  SET_REGISTER_EMAIL,
  CHANGE_ROUTE,
  SET_LOGIN_EMAIL,
  SET_LOGIN_PASSWORD
 } from './constants'

const initialRegisterState = {
  email: '',
  setPass1: '',
  setPass2: '',
  passErr: '',
  password: null
}

export const fillRegisterForm = (state=initialRegisterState, action={}) => {
  switch (action.type) {
    case CHANGE_PASS_FIELD_1:
      return Object.assign({}, state, {setPass1: action.payload})
    case CHANGE_PASS_FIELD_2:
      return Object.assign({}, state, {setPass2: action.payload})
    case SET_PASSWORD:
      return Object.assign({}, state, {password: action.payload})
    default:
      return state
  }
}
