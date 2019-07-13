import React from "react";

class OnlineUser extends React.Component {
  setPropsForPm = () => {
    const { setPmUserName, setPmSid, username, sid, currentUser } = this.props;
    if (username !== currentUser) {
      setPmUserName(username);
      setPmSid(sid);
    }
  };

  render() {
    const { username, sid } = this.props;
    return (
      <div className="online-user">
        <div className="prof-picture">
          {username ? username.charAt(0).toUpperCase() : ""}
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
