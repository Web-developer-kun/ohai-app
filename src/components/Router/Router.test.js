import { shallow } from "enzyme";
import React from "react";
import Router from "./Router";

let wrapper;
beforeEach(() => {
  const mockProps = {
    email: "",
    setPass1: "",
    setPass2: "",
    formErrMsg: "",
    password: "",
    signInEmail: "",
    signInPassword: "",
    route: "signin",
    onEmailChange: jest.fn(),
    onSetPass1: jest.fn(),
    onSetPass2: jest.fn(),
    setFormErrMsg: jest.fn(),
    setPassword: jest.fn(),
    onSignInEmailChange: jest.fn(),
    onSignInPasswordChange: jest.fn(),
    changeRoute: jest.fn()
  };
  wrapper = shallow(<Router {...mockProps} />);
});
it("renders Router component", () => {
  expect(wrapper).toMatchSnapshot();
});
