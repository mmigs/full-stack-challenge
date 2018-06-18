import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setUser, setToken } from "../../actions/appActions";
import AuthenticatedPage from "../AuthenticatedPage/AuthenticatedPage";

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: props.user && props.user.admin,
      loggedIn: !!props.token
    };
  }

  render() {
    if (this.state.isAdmin) {
      return <AuthenticatedPage>{this.props.children}</AuthenticatedPage>;
    } else {
      return <Redirect to="/home" />;
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
)(AdminPage);
