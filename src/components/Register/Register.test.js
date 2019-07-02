import React from "react";
import { shallow } from "enzyme";
import Register from "./Register";

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
    route: "register"
  };
  wrapper = shallow(<Register {...mockProps} />);
});

it("renders without crashing", () => {
  expect(wrapper).toMatchSnapshot();
});
