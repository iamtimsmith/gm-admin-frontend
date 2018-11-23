import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import TextField from "../common/TextField";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password1: this.state.password2
    };

    axios
      .post("/api/users/register", userData)
      .then(res => this.props.history.push("/login"))
      .catch(err => {
        this.setState({
          errors: err.response.data
        });
      });
  }

  render() {
    return (
      <div className="register">
        <h1>Register</h1>
        <form noValidate onSubmit={this.onSubmit}>
          <TextField
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.onChange}
            error={this.state.errors.name}
          />
          <TextField
            type="text"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.onChange}
            error={this.state.errors.email}
          />
          <TextField
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChange}
            error={this.state.errors.password}
          />
          <TextField
            type="password"
            name="password2"
            placeholder="Password Confirm"
            value={this.state.password2}
            onChange={this.onChange}
            error={this.state.errors.password2}
          />
          <button className="primary">Register</button>
          <p>
            Have an account? <Link to="/login">Log In</Link>
          </p>
        </form>
      </div>
    );
  }
}
export default withRouter(Login);
