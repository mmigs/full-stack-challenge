import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AdminPage from "../AdminPage/AdminPage";
import { setUser, setToken } from "../../actions/appActions";
import { EmployeesApi } from "../../api/Api";
import "../../forms.css";
import "../Employees/Employees.css";

class EmployeeForm extends Component {
  static propTypes = {
    employeeId: PropTypes.number
  };

  static defaultProps = {
    employeeId: 0
  };

  constructor(props) {
    super(props);
    const { match } = props;
    console.log("form match", match);
    this.state = {
      editMode: !!(match && match.params && match.params.id),
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
      admin: false,
      startDate: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    EmployeesApi.getAll().then(data => {
      this.setState({ employees: data.employees });
    });
  }

  handleInputChange(e) {
    const { target } = e;
    const { name } = target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value
    });
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      passwordConfirm,
      admin,
      startDate,
      editMode
    } = this.state;

    return (
      <AdminPage>
        <div className="employee-form">
          <form>
            <h3>{editMode ? "Edit Employee" : "Add Employee"}</h3>
            <table className="employees-table" cellPadding="0" cellSpacing="0">
              <tbody>
                <tr className="employees-table-item">
                  <td>First Name</td>
                  <td>
                    <input
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={this.handleInputChange}
                    />
                  </td>
                </tr>
                <tr className="employees-table-item">
                  <td>Last Name</td>
                  <td>
                    <input
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={this.handleInputChange}
                    />
                  </td>
                </tr>
                <tr className="employees-table-item">
                  <td>Email</td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={this.handleInputChange}
                    />
                  </td>
                </tr>
                <tr className="employees-table-item">
                  <td>Phone</td>
                  <td>
                    <input
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={this.handleInputChange}
                    />
                  </td>
                </tr>
                <tr className="employees-table-item">
                  <td>Password</td>
                  <td>
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={this.handleInputChange}
                    />
                  </td>
                </tr>
                <tr className="employees-table-item">
                  <td>Password Confifm</td>
                  <td>
                    <input
                      type="password"
                      name="passwordConfirm"
                      value={passwordConfirm}
                      onChange={this.handleInputChange}
                    />
                  </td>
                </tr>
                <tr className="employees-table-item">
                  <td>Admin</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={admin}
                      onChange={this.handleInputChange}
                    />
                  </td>
                </tr>
                <tr className="employees-table-item">
                  <td>Start Date</td>
                  <td>
                    <input
                      type="text"
                      value={startDate}
                      onChange={this.handleInputChange}
                    />
                  </td>
                </tr>
                <tr className="employees-table-item align-right">
                  <td colSpan="2">
                    <button type="submit">Save</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
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
)(EmployeeForm);
