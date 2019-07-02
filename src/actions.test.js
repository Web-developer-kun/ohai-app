import { SET_LOGIN_EMAIL } from "./constants";

import * as actions from "./actions";

it("should create an action to set sign in email field", () => {
  const text = "chunkylover53@aol.com";
  const expectedAction = {
    type: SET_LOGIN_EMAIL,
    payload: text
  };
  expect(actions.setLoginEmail(text)).toEqual(expectedAction);
});
