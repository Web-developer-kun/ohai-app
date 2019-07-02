import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import App from "./App";

const mockStore = configureMockStore();
const store = mockStore({});

let wrapper = shallow(
  <Provider store={store}>
    <App />
  </Provider>
);
it("renders without crashing", () => {
  expect(wrapper).toMatchSnapshot();
});
