import React from "react";
import { shallow } from "enzyme";
import Register from "./Signin";

it("renders without crashing", () => {
  expect(shallow(<Register />)).toMatchSnapshot();
});
