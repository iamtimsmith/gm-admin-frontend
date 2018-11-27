import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import setAuthToken from "../common/AuthToken";
import TextField from "../common/TextField";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
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
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("/api/users/login", userData)
      .then(res => {
        // Save to local storage
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        // Set token to Auth header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        this.props.onLogin(decoded);
        this.props.history.push("/");
      })
      .catch(err => {
        this.setState({
          errors: err.response.data
        });
      });
  }

  render() {
    return (
      <div className="login">
        <h1>Login</h1>
        <form noValidate onSubmit={this.onSubmit}>
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
          <button className="primary">Login</button>
          <p>
            Don't have an account yet? <Link to="/register">Sign up</Link>
          </p>
        </form>
      </div>
    );
  }
}
export default Login;
