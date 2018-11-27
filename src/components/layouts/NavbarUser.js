import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "../../images/d20.png";

class NavbarUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onLogout = this.onLogout.bind(this);
  }

  onLogout() {
    this.props.onLogout();
    this.props.history.push("/");
  }

  render() {
    return (
      <nav>
        <div>
          <p>
            <Link to="/">
              <img src={Logo} alt="GM Admin" />
            </Link>
          </p>
          <ul>
            <li onClick={() => this.props.toggleModal()}>
              <span className="ra ra-quill-ink" />
              <div>Campaigns</div>
            </li>
            <li>
              <Link to="/notes">
                <span className="ra ra-book" />
                <div>Notes</div>
              </Link>
            </li>
            <li>
              <Link to="/locations">
                <span className="fa fa-map-marker" />
                <div>Locations</div>
              </Link>
            </li>
            <li>
              <Link to="/npcs">
                <span className="ra ra-hood" />
                <div>NPCs</div>
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/settings">
                <span className="fa fa-cog" />
                <div>Settings</div>
              </Link>
            </li>
            <li onClick={() => this.onLogout()}>
              <span className="fa fa-sign-out" />
              <div>Logout</div>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(NavbarUser);
