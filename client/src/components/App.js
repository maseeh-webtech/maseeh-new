import React, { Component } from "react";
import { Router } from "@reach/router";
import Homepage from "./Homepage/Homepage";
import NavBar from "./NavBar/NavBar";
import Profile from "./Profile/Profile";
import NotFound from "./NotFound/NotFound";
import DevLogin from "./DevLogin/DevLogin";

// Import CSS files for styling
import "./App.css";
import "../utils.css";
import { post } from "../utils";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
    };
  }

  handleLogin() {
    post("/api/login").then((res) => console.log(res));
  }

  render() {
    return (
      <>
        <NavBar user={this.state.user} handleLogin={this.handleLogin} />
        <Router className="AppContainer">
          <Homepage path="/" />
          <Profile path="/profile" user={this.state.user} />
          <DevLogin path="/devlogin" />
          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
