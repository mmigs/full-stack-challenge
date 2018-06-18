import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "../logo.svg";
import "./App.css";
import Login from "./Login/Login";
import Employees from "./Employees/Employees";

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <Router>
            <Route exact path="/" component={Login} />
            <Route path="/employees" component={Employees} />
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
