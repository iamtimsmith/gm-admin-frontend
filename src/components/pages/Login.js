import React, { Component } from "react";
import TextField from "../common/TextField";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: ""
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="login">
        <form noValidate>
          <TextField
            type="text"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.onChange}
            errors={this.state.errors}
          />
          <TextField
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.onChange}
            errors={this.state.errors}
          />
          <button className="primary">Login</button>
        </form>
      </div>
    );
  }
}
export default Login;
