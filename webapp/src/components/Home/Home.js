import React, { Component } from "react";
import { connect } from "react-redux";
import AuthenticatedPage from "../AuthenticatedPage/AuthenticatedPage";
import { setUser, setToken } from "../../actions/appActions";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { user } = this.props;
    return (
      <AuthenticatedPage>
        <h3>Welcome {user && user.firstName}</h3>
      </AuthenticatedPage>
    );
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
)(Home);
