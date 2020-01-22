import React, { Component } from "react";
import "./Homepage.css";

export class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="Homepage-welcomeText">Welcome to Maseeh Hall!</div>
        <div></div>
      </div>
    );
  }
}

export default Homepage;
