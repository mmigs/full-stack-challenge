import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setUser, setToken } from "../../actions/appActions";
import AuthService from "../../services/AuthService";
import "./AuthenticatedPage.css";

class AuthenticatedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: !!props.token,
      isAdmin: props.user && props.user.admin
    };
    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();
    AuthService.logout();
    this.setState({
      loggedIn: false
    });
  }

  render() {
    const { isAdmin, loggedIn } = this.state;
    if (loggedIn) {
      return (
        <div className="page-layout">
          <nav className="page-nav">
            <Link to="/home">Home</Link>
            {isAdmin && <Link to="/employees">Employees</Link>}
            <a href="/logout" onClick={this.logout}>
              Logout
            </a>
          </nav>
          <section className="page-body">{this.props.children}</section>
        </div>
      );
    } else {
      return <Redirect to="/" />;
    }
  }
}

const mapStateToProps = state => {
  return {
    token: state.app.token,
    user: state.app.user
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
)(AuthenticatedPage);
