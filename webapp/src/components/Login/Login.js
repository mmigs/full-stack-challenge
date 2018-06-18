import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Login.less";

export default class Login extends Component {
  static propTypes = {
    prop: PropTypes
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { email, password } = this.state;

    return (
      <div className="login">
        <h2>Login</h2>
        <form>
          <label>
            Email:
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={email}
              required
              autoComplete="false"
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              required
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }
}
