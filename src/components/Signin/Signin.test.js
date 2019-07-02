import React from "react";
import { shallow } from "enzyme";
import Signin from "./Signin";

it("renders without crashing", () => {
  expect(shallow(<Signin />)).toMatchSnapshot();
});
