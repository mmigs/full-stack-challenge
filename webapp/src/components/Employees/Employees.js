import React, { Component } from "react";
import { connect } from "react-redux";
import AdminPage from "../AdminPage/AdminPage";
import { setUser, setToken } from "../../actions/appActions";
import { EmployeesApi } from "../../api/Api";
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
          <table className="employees-list" cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Employee Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id} className="employees-list-item">
                  <td>{employee.id}</td>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.admin ? "Admin" : "Employee"}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
