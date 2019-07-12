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
      <div className="online-user">
        <div className="prof-picture" style={{ display: "inline-block" }}>
          {username.charAt(0).toUpperCase()}
        </div>
        <div
          className="active-chat-user"
          sid={sid}
          onClick={this.setPropsForPm}
          style={{ display: "inline-block" }}
        >
          {username}
        </div>
      </div>
    );
  }
}

export default OnlineUser;
