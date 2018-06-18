import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import Login from "./Login/Login";
import Employees from "./Employees/Employees";
import Home from "./Home/Home";
import { setUser, setToken } from "../actions/appActions";

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/home" component={Home} />
              <Route path="/employees" component={Employees} />
            </Switch>
          </Router>
        </header>
      </div>
    );
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
)(App);
