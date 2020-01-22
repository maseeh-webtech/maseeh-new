import React, { Component } from "react";
import { Link } from "@reach/router";
import "./NavBar.css";

class NavBar extends Component {
  render() {
    return (
      <nav className="NavBar-container">
        <div className="NavBar-title">
          <div className="NavBar-logo" />
          <div className="NavBar-titleText">Maseeh Hall</div>
        </div>
        <div className="NavBar-buttonContainer">
          <Link to="/" className="NavBar-button">
            Home
          </Link>
          {this.props.user && (
            <Link to="/profile" className="NavBar-button">
              Profile
            </Link>
          )}
        </div>
        <a onClick={this.props.handleLogin}>log in</a>
      </nav>
    );
  }
}

export default NavBar;
