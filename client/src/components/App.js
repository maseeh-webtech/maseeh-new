import React, { Component } from "react";
import "./App.css";
import Homepage from "./Homepage.js";
import NavBar from "./NavBar.js";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <NavBar />
        <Homepage />
      </>
    );
  }
}

export default App;
