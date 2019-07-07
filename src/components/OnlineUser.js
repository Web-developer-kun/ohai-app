import React from "react";

class OnlineUser extends React.Component {
  setPropsForPm = () => {
    const { setPmUserName, setPmSid, username, sid } = this.props;
    setPmUserName(username);
    setPmSid(sid);
  };

  render() {
    const { username, sid } = this.props;
    return (
      <div
        className="btn btn-lg btn-primary"
        sid={sid}
        onClick={this.setPropsForPm}
      >
        {username}
      </div>
    );
  }
}

export default OnlineUser;
