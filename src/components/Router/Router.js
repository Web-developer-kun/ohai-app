import React, { Suspense } from "react";
const Signin = React.lazy(() => import("../Signin/Signin"));
const Register = React.lazy(() => import("../Register/Register"));
const Placeholder = React.lazy(() => import("../TownSquare/TownSquare"));

class Router extends React.Component {
  render() {
    const { route } = this.props;
    if (route === "signin") {
      return (
        <div
          className="signin-container"
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense
            fallback={<div style={{ backgroundColor: "#36393f" }}></div>}
          >
            <Signin {...this.props} />
          </Suspense>
        </div>
      );
    } else if (route === "register") {
      return (
        <div
          className="register-container"
          style={{ width: "100%", height: "100%" }}
        >
          <Suspense
            fallback={<div style={{ backgroundColor: "#36393f" }}></div>}
          >
            <Register {...this.props} />
          </Suspense>
        </div>
      );
    } else if (route === "townsquare") {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <Suspense
            fallback={<div style={{ backgroundColor: "#36393f" }}></div>}
          >
            <Placeholder {...this.props} />
          </Suspense>
        </div>
      );
    }
  }
}

export default Router;
