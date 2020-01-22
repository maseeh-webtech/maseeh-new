import React, { Component } from "react";
import "./Profile.css";

class Profile extends Component {
  render() {
    return (
      <>
        <div className="Profile-text">Hello, {this.props.user.name}!</div>
      </>
    );
  }
}

export default Profile;
