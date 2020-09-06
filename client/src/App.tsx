import * as React from "react";
import axios from "axios";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";

import "semantic-ui-css/semantic.min.css";
import "./styles.css";
import "./utils.css";
import "./App.css";

import HomePage from "./pages/Home";
import ResidentsPage from "./pages/Residents";
import ProfilePage from "./pages/Profile";
import NotFound from "./pages/NotFound";
import UserContext from "./context/UserContext";

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
      <UserContext.Provider value={user}>
        <header className="App-header">
          <div className="App-top-container">
            <h1>Maseeh Hall</h1>
            <button onClick={handleLogin} className="App-login">
              Log in
            </button>
          </div>
          <div className="App-nav">
            <Link to="/">Home</Link> | <Link to="/profile">Profile</Link> |{" "}
            <Link to="/residents">Residents</Link>
          </div>
        </header>

        <div className="App-container">
          <Router>
            <HomePage path="/" />
            <ProfilePage path="/profile" />
            <ResidentsPage path="/residents" />
            <NotFound default />
          </Router>
        </div>
      </UserContext.Provider>
    </>
  );
};

var mountNode = document.getElementById("app");
render(<App />, mountNode);
