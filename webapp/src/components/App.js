import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import Login from "./Login/Login";
import Employees from "./Employees/Employees";
import Home from "./Home/Home";
import { setUser, setToken } from "../actions/appActions";
import EmployeeForm from "./EmployeeForm/EmployeeForm";
import EmployeeReviews from "./EmployeeReviews/EmployeeReviews";

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/home" component={Home} />
            <Route exact path="/employees" component={Employees} />
            <Route exact path="/employees/add" component={EmployeeForm} />
            <Route
              exact
              path="/employees/:employeeId"
              component={EmployeeForm}
            />
            <Route
              exact
              path="/employees/:employeeId/reviews"
              component={EmployeeReviews}
            />
            />
          </Switch>
        </Router>
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
