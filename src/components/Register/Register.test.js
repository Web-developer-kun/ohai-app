import React from "react";
import { shallow } from "enzyme";
import Register from "./Register";

let wrapper;
beforeEach(() => {
  const mockProps = {
    email: "chunkylover53@pm.me",
    setPass1: "123",
    setPass2: "123",
    formErrMsg: "",
    password: "123",
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
  wrapper = shallow(<Register {...mockProps} />);
});

it("renders register component", () => {
  expect(wrapper).toMatchSnapshot();
});

it("navigates to signin", () => {
  expect(wrapper.instance().navigateToSignIn());
});

it("checks password", () => {
  expect(wrapper.instance().checkPassword());
});

it("registers a user", done => {
  expect(wrapper.instance().onSubmitRegister());
  done();
});
