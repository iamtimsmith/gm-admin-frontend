import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./components/common/AuthToken";
import "normalize.css";
import "./sass/app.scss";

// Components
import NavbarGuest from "./components/layouts/NavbarGuest";

// Pages
import Home from "./components/pages/Home";
import Docs from "./components/pages/Documentation";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loggedIn: false
    };
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    // Check for token
    if (localStorage.jwtToken) {
      // Set auth token header auth
      setAuthToken(localStorage.jwtToken);
      // Decode token and get user infor and exp
      const decoded = jwt_decode(localStorage.jwtToken);
      // Set user and isAuthenticated
      this.setState({
        user: decoded,
        loggedIn: true
      });
      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        this.onLogout();
        window.location.href = "/login";
      }
    }
  }

  onLogin(decoded) {
    this.setState({
      user: decoded,
      loggedIn: true
    });
  }

  onLogout() {
    // Remove token from localstorage
    localStorage.removeItem("jwtToken");
    // Remove Auth Header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    this.setState({
      user: {},
      loggedIn: false
    });
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
              <Route path="/register" component={Register} />
              <Route
                path="/login"
                render={props => <Login {...props} onLogin={this.onLogin} />}
              />
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
