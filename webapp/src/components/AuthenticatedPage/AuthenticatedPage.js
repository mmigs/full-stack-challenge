import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setUser, setToken } from "../../actions/appActions";

class AuthenticatedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: !!props.token
    };
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div className="page-layout">
          <nav>
            <ul>
              <Link to="/home">Home</Link>
              <Link to="/employees">Employees</Link>
            </ul>
          </nav>
          <section>{this.props.children}</section>
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
