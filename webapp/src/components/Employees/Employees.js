import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AdminPage from "../AdminPage/AdminPage";
import { setUser, setToken } from "../../actions/appActions";
import { EmployeesApi } from "../../api/Api";
import EmployeeForm from "../EmployeeForm/EmployeeForm";
import "./Employees.css";

class Employees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    };
  }

  componentDidMount() {
    EmployeesApi.getAll().then(data => {
      this.setState({ employees: data.employees });
    });
  }

  render() {
    const { employees } = this.state;
    return (
      <AdminPage>
        <div className="employees">
          <table className="employees-table" cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Employee Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr
                  key={employee.id}
                  className="employees-table-item"
                  onClick={this.handleViewEmployee}
                >
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.admin ? "Admin" : "Employee"}</td>
                  <td>
                    <Link to={`/employees/${employee.id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to={`/employees/add`}>Add Employee</Link>
        </div>
      </AdminPage>
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
)(Employees);
