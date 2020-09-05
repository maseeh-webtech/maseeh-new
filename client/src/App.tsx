import * as React from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";

import "./styles.css";
import "./utils.css";
import "./App.css";

import SecondPage from "./pages/SecondPage";
import NotFound from "./pages/NotFound";
import Homepage from "./pages/Homepage";

const App = () => {
  return (
    <>
      <header className="App-header">
        <h1>Template app</h1>
        <div className="App-nav">
          <Link to="/">Home</Link> | <Link to="/second">Second page</Link>
        </div>
      </header>

      <div className="App-container">
        <Router>
          <Homepage path="/" />
          <SecondPage path="/second" />
          <NotFound default />
        </Router>
      </div>
    </>
  );
};

var mountNode = document.getElementById("app");
render(<App />, mountNode);
