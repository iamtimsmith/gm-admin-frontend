import React, { Component } from "react";
import { Link } from "react-router-dom";
import TextField from "../common/TextField";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.user.name,
      email: this.props.user.email
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="settings">
        <h1>Settings</h1>
        <TextField
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.onChange}
          error={this.state.errors.name}
          disabled={true}
        />
        <TextField
          type="email"
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          error={this.state.errors.email}
          disabled={true}
        />
        <div className="delete-button">
          <Link to="/settings/delete-account" className="button">
            Delete Account
          </Link>
        </div>
      </div>
    );
  }
}
export default Settings;
