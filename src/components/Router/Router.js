import React, { Suspense } from "react";
import "../../bootstrap-social.css";
const Signin = React.lazy(() => import("../Signin/Signin"));
const Register = React.lazy(() => import("../Register/Register"));
const Placeholder = React.lazy(() => import("../Placeholder/Placeholder"));

class Router extends React.Component {
  render() {
    const { route } = this.props;
    if (route === "signin") {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <Suspense fallback={<h1>Signin</h1>}>
            <Signin {...this.props} />
          </Suspense>
        </div>
      );
    } else if (route === "register") {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <Suspense fallback={<h1>Register</h1>}>
            <Register {...this.props} />
          </Suspense>
        </div>
      );
    } else if (route === "placeholder") {
      return (
        <div style={{ width: "100%", height: "100%" }}>
          <Suspense fallback={<h1>Register</h1>}>
            <Placeholder {...this.props} />
          </Suspense>
        </div>
      );
    }
  }
}

export default Router;
