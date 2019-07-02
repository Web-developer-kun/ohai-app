import { SET_LOGIN_EMAIL } from "./constants";

import * as actions from "./actions";

it("should create an action to set sign in email field", () => {
  const expectedAction = {
    type: SET_LOGIN_EMAIL,
    payload: "chunkylover53@aol.com"
  };
  expect(actions.setLoginEmail("chunkylover53@aol.com")).toEqual(
    expectedAction
  );
});
