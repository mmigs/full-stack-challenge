import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "./Login.css";
import AuthService from "../../services/AuthService";
import { setUser, setToken } from "../../actions/appActions";

class Login extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      email: "",
      password: "",
      loggedIn: props.token
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {}

  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleFormSubmit(e) {
    const { email, password } = this.state;
    const { setUser, setToken } = this.props;

    e.preventDefault();
    AuthService.login(email, password).then(data => {
      setToken(data.token);
      setUser(data.user);
      this.setState({
        loggedIn: true
      });
    });
  }

  render() {
    const { email, password, loggedIn } = this.state;

    if (loggedIn) {
      return <Redirect to="/employees" />;
    } else {
      return (
        <div className="login">
          <h2>Login</h2>
          <form onSubmit={this.handleFormSubmit}>
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
}

const mapStateToProps = state => {
  return {
    token: state.token,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => {
      dispatch(setUser(user));
    },
    setToken: token => {
      dispatch(setToken(token));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
