import React, { Component } from "react";
import Homepage from "./Homepage/Homepage.js";
import NavBar from "./NavBar/NavBar.js";

// Import CSS files for styling
import "./App.css";
import "../utils.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <>
        <NavBar />
        <div className="AppContainer">
          <Homepage className="Homepage" />
        </div>
      </>
    );
  }
}

export default App;
