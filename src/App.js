import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import setAuthToken from "./components/common/AuthToken";
import "normalize.css";
import "../node_modules/rpg-awesome/css/rpg-awesome.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./sass/app.scss";

// Components
import NavbarGuest from "./components/layouts/NavbarGuest";
import FooterGuest from "./components/layouts/FooterGuest";
import NavbarUser from "./components/layouts/NavbarUser";
import Modal from "./components/common/Modal";

// Pages
import Home from "./components/pages/Home";
import Docs from "./components/pages/Documentation";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard";
import Notebook from "./components/notebook/Notebook";
import Settings from "./components/pages/Settings";
import DeleteAccount from "./components/pages/DeleteAccount";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      loggedIn: false,
      modal: false,
      campaigns: [],
      currentCampaign: localStorage.getItem("campaign"),
      items: []
    };
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.selectCampaign = this.selectCampaign.bind(this);
    this.onDeleteAccount = this.onDeleteAccount.bind(this);
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
        loggedIn: true,
        currentCampaign: localStorage.getItem("campaign")
      });
      // Check for expired token
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        this.onLogout();
        this.props.history.push("/login");
      }

      axios
        .get("/api/campaigns")
        .then(res =>
          this.setState({
            campaigns: res.data
          })
        )
        .catch(err => {
          console.log("There are currently no campaigns available");
        });
    }
  }

  onLogin(decoded) {
    this.setState({
      user: decoded,
      loggedIn: true
    });
    axios
      .get("/api/campaigns")
      .then(res =>
        this.setState({
          campaigns: res.data
        })
      )
      .catch(err => {
        console.log("There are currently no campaigns available");
      });
  }

  onLogout() {
    // Remove token from localstorage
    localStorage.removeItem("campaign");
    localStorage.removeItem("jwtToken");
    // Remove Auth Header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    this.setState({
      user: {},
      loggedIn: false
    });
  }

  toggleModal() {
    const modal = !this.state.modal;
    this.setState({
      modal
    });
  }

  selectCampaign(name) {
    this.setState({
      currentCampaign: name
    });
    localStorage.setItem("campaign", name);
    this.toggleModal();
  }

  onDeleteAccount() {
    axios.delete("/api/users").then(res => {
      this.setState({
        user: {},
        loggedIn: false
      });
    });
  }

  render() {
    let layout;
    this.state.loggedIn
      ? (layout = (
          <div className="user">
            <NavbarUser
              toggleModal={this.toggleModal}
              onLogout={this.onLogout}
            />
            <div>
              <Route
                path="/"
                exact
                render={props => (
                  <Dashboard
                    {...props}
                    name={this.state.user.name}
                    campaigns={this.state.campaigns}
                    toggleModal={this.toggleModal}
                  />
                )}
              />
              <Route
                path="/notes"
                render={props => (
                  <Notebook
                    {...props}
                    section="Notes"
                    campaign={this.state.currentCampaign}
                    toggleModal={this.toggleModal}
                  />
                )}
              />
              <Route
                path="/locations"
                render={props => (
                  <Notebook
                    {...props}
                    section="Locations"
                    campaign={this.state.currentCampaign}
                    toggleModal={this.toggleModal}
                  />
                )}
              />
              <Route
                path="/npcs"
                render={props => (
                  <Notebook
                    {...props}
                    section="NPCs"
                    campaign={this.state.currentCampaign}
                    toggleModal={this.toggleModal}
                  />
                )}
              />
              <Route
                path="/settings"
                exact
                render={props => <Settings {...props} user={this.state.user} />}
              />
              <Route
                path="/settings/delete-account"
                render={props => (
                  <DeleteAccount {...props} onDelete={this.onDeleteAccount} />
                )}
              />
            </div>
            <Modal
              show={this.state.modal}
              toggleModal={this.toggleModal}
              select={this.selectCampaign}
              campaigns={this.state.campaigns}
            />
          </div>
        ))
      : (layout = (
          <div className="guest">
            <NavbarGuest />
            <div>
              <Route path="/" exact component={Home} />
              <Route path="/documentation" component={Docs} />
              <Route
                path="/register"
                render={props => <Register {...props} onLogin={this.onLogin} />}
              />
              <Route
                path="/login"
                render={props => <Login {...props} onLogin={this.onLogin} />}
              />
            </div>
            <FooterGuest />
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
