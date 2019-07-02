import React from "react";
import { shallow } from "enzyme";
import Placeholder from "./Placeholder";

it("renders without crashing", () => {
  expect(shallow(<Placeholder />)).toMatchSnapshot();
});
