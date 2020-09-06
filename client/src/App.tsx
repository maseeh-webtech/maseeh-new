import * as React from "react";
import axios from "axios";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";

import "./styles.css";
import "./utils.css";
import "./App.css";

import SecondPage from "./pages/SecondPage";
import NotFound from "./pages/NotFound";
import Homepage from "./pages/Homepage";

const App = () => {
  const [user, setUser] = React.useState<null | object>(null);
  const handleLogin = () => {
    axios
      .get("/api/login")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <header className="App-header">
        <div className="App-top-container">
          <h1>Maseeh Hall</h1>
          <button onClick={handleLogin} className="App-login">
            Log in
          </button>
        </div>
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
