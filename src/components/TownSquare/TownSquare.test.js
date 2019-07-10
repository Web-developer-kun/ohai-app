import React from "react";
import { shallow } from "enzyme";
import TownSquare from "./TownSquare";

it("renders without crashing", () => {
  expect(shallow(<TownSquare />)).toMatchSnapshot();
});
