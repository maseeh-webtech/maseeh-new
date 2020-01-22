import React, { Component } from "react";
import { get } from "../../utils";
import "./Homepage.css";

export class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    get("/api/residents/all").then((residents) => {
      console.log(residents);
    });
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
