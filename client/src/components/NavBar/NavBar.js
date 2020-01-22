import React, { Component } from "react";
import "./NavBar.css";

class NavBar extends Component {
  render() {
    return (
      <nav className="NavBar-container">
        <div className="NavBar-title">
          <div className="NavBar-logo" />
          <div className="NavBar-titleText">Maseeh Hall</div>
        </div>
        <div className="NavBar-buttonContainer"></div>
      </nav>
    );
  }
}

export default NavBar;
