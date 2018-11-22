import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "normalize.css";
import "./sass/app.scss";

// Components
import NavbarGuest from "./components/layouts/NavbarGuest";

// Pages
import Home from "./components/pages/Home";
import Docs from "./components/pages/Documentation";
import Login from "./components/pages/Login";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
  }
  render() {
    let layout;
    this.state.loggedIn
      ? (layout = (
          <div className="user">
            <h1>Logged In</h1>
          </div>
        ))
      : (layout = (
          <div className="guest">
            <NavbarGuest />
            <div>
              <Route path="/" exact component={Home} />
              <Route path="/documentation" component={Docs} />
              <Route path="/login" component={Login} />
            </div>
          </div>
        ));
    return (
      <Router>
        <div>{layout}</div>
      </Router>
    );
  }
}
export default App;
