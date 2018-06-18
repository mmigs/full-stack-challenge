import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setUser, setToken } from "../../actions/appActions";
import "./AuthenticatedPage.css";

class AuthenticatedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: !!props.token
    };
    console.log(this.state);
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div className="page-layout">
          <nav className="page-nav">
            <Link to="/home">Home</Link>
            <Link to="/employees">Employees</Link>
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
