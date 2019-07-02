import { SET_REGISTER_EMAIL } from "./constants";
import * as reducers from "./reducers";

describe("fillRegisterForm", () => {
  const initialRegisterState = {
    email: "",
    setPass1: "",
    setPass2: "",
    formErrMsg: "",
    password: ""
  };

  it("should return the initial state", () => {
    expect(reducers.fillRegisterForm(undefined, {})).toEqual({
      email: "",
      setPass1: "",
      setPass2: "",
      formErrMsg: "",
      password: ""
    });
  });

  it("should handle SET_REGISTER_EMAIL", () => {
    expect(
      reducers.fillRegisterForm(initialRegisterState, {
        type: SET_REGISTER_EMAIL,
        payload: "test123@hotmail.com"
      })
    ).toEqual({
      email: "test123@hotmail.com",
      setPass1: "",
      setPass2: "",
      formErrMsg: "",
      password: ""
    });
  });
});
