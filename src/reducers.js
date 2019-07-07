import {
  SET_REGISTER_EMAIL,
  CHANGE_PASS_FIELD_1,
  CHANGE_PASS_FIELD_2,
  SET_FORM_ERR,
  SET_PASSWORD,
  SET_LOGIN_EMAIL,
  SET_LOGIN_PASSWORD,
  CHANGE_ROUTE,
  SET_SESSION_CREDENTIALS,
  SET_COMPOSE_INPUT,
  SET_SFW_SCORE,
  SET_NSFW_SCORE,
  UPLOADING_PENDING,
  UPLOADING_SUCCESS,
  UPLOADING_FAILED,
  CLEAR_IMAGE_TRAY,
  PUSH_POST,
  SET_PM_SID,
  SET_PM_USERNAME,
  SET_CONNECTED_SOCKETS
} from "./constants";

const initialRegisterState = {
  email: "",
  setPass1: "",
  setPass2: "",
  formErrMsg: "",
  password: ""
};

export const fillRegisterForm = (state = initialRegisterState, action = {}) => {
  switch (action.type) {
    case SET_REGISTER_EMAIL:
      return Object.assign({}, state, { email: action.payload });
    case CHANGE_PASS_FIELD_1:
      return Object.assign({}, state, { setPass1: action.payload });
    case CHANGE_PASS_FIELD_2:
      return Object.assign({}, state, { setPass2: action.payload });
    case SET_FORM_ERR:
      return Object.assign({}, state, { formErrMsg: action.payload });
    case SET_PASSWORD:
      return Object.assign({}, state, { password: action.payload });
    default:
      return state;
  }
};

const initialSigninState = {
  signInEmail: "",
  signInPassword: ""
};

export const fillSigninForm = (state = initialSigninState, action = {}) => {
  switch (action.type) {
    case SET_LOGIN_EMAIL:
      return Object.assign({}, state, { signInEmail: action.payload });
    case SET_LOGIN_PASSWORD:
      return Object.assign({}, state, { signInPassword: action.payload });
    default:
      return state;
  }
};

const initialRouteState = {
  route: "signin"
};

export const changeRoute = (state = initialRouteState, action = {}) => {
  switch (action.type) {
    case CHANGE_ROUTE:
      return Object.assign({}, state, { route: action.payload });
    default:
      return state;
  }
};

const initialSessionState = {
  session_creds: {
    email: "",
    id: ""
  }
};

export const setLoggedInCreds = (state = initialSessionState, action = {}) => {
  switch (action.type) {
    case SET_SESSION_CREDENTIALS:
      return Object.assign({}, state, { session_creds: action.payload });
    default:
      return state;
  }
};

const initialTsqState = {
  msgBox: ""
};

export const setComposeInputField = (state = initialTsqState, action = {}) => {
  switch (action.type) {
    case SET_COMPOSE_INPUT:
      return Object.assign({}, state, { msgBox: action.payload });
    default:
      return state;
  }
};

const initialSfwState = {
  sfwScoreString: "",
  nsfwScoreString: ""
};

export const setSfwScoreResults = (state = initialSfwState, action = {}) => {
  switch (action.type) {
    case SET_SFW_SCORE:
      return Object.assign({}, state, { sfwScoreString: action.payload });
    case SET_NSFW_SCORE:
      return Object.assign({}, state, { nsfwScoreString: action.payload });
    default:
      return state;
  }
};

const initialUploadState = {
  images: [],
  uploading: false
};

export const uploadImagesToCloudinary = (
  state = initialUploadState,
  action = {}
) => {
  switch (action.type) {
    case UPLOADING_PENDING:
      return Object.assign({}, state, { uploading: true });
    case UPLOADING_SUCCESS:
      return Object.assign({}, state, {
        images: action.payload,
        uploading: false
      });
    case UPLOADING_FAILED:
      return Object.assign({}, state, {
        error: action.payload,
        uploading: false
      });
    case CLEAR_IMAGE_TRAY:
      return Object.assign({}, state, { images: action.payload });
    default:
      return state;
  }
};

const initialPostState = {
  posts: []
};

export const pushPostsToChatBox = (state = initialPostState, action = {}) => {
  switch (action.type) {
    case PUSH_POST:
      return Object.assign({}, state, {
        posts: [...state.posts, action.payload]
      });
    default:
      return state;
  }
};

const initialPmState = {
  pmUserSid: "",
  pmUserName: ""
};

export const setPmCreds = (state = initialPmState, action = {}) => {
  switch (action.type) {
    case SET_PM_SID:
      return Object.assign({}, state, { pmUserSid: action.payload });
    case SET_PM_USERNAME:
      return Object.assign({}, state, { pmUserName: action.payload });
    default:
      return state;
  }
};

const initialSocketsState = {
  connectedSockets: []
};

export const setConnectedSockets = (
  state = initialSocketsState,
  action = {}
) => {
  switch (action.type) {
    case SET_CONNECTED_SOCKETS:
      return Object.assign({}, state, { connectedSockets: action.payload });
    default:
      return state;
  }
};
