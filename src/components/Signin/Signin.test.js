import React from "react";
import { shallow } from "enzyme";
import Signin from "./Signin";

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
    route: "signin"
  };
  wrapper = shallow(<Signin {...mockProps} />);
});

it("renders without crashing", () => {
  expect(wrapper).toMatchSnapshot();
});
