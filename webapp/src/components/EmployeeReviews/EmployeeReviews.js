import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AdminPage from "../AdminPage/AdminPage";
import { setUser, setToken } from "../../actions/appActions";
import { EmployeesApi } from "../../api/Api";
import "../Employees/Employees.css";

class EmployeeReviews extends Component {
  constructor(props) {
    super(props);
    const { match } = props;
    this.state = {
      employeeId: match && match.params && match.params.employeeId,
      employee: null,
      reviews: []
    };
    this.renderEmptyState = this.renderEmptyState.bind(this);
    this.renderReviews = this.renderReviews.bind(this);

    console.log(this.state);
  }

  componentDidMount() {
    const { employeeId } = this.state;
    EmployeesApi.getById(employeeId).then(data => {
      this.setState({ employee: data });
    });
    EmployeesApi.getEmployeeReviews(employeeId).then(data => {
      this.setState({ reviews: data.reviews });
    });
  }

  renderEmptyState() {
    return (
      <tr className="employees-table-item">
        <td colSpan="3">No reviews</td>
      </tr>
    );
  }

  renderReviews() {
    const { reviews } = this.state;
    return reviews.map(review => (
      <tr key={review.id} className="employees-table-item">
        <td>
          {review.reviewer.firstName} {review.reviewer.lastName}
        </td>
        <td>{review.review}</td>
        <td>N/A</td>
      </tr>
    ));
  }

  render() {
    const { employee, reviews } = this.state;
    return (
      <AdminPage>
        <div className="employee">
          {employee && (
            <div>
              Viewing Reviews For: {employee.firstName} {employee.lastName}
            </div>
          )}
          <table className="employees-table" cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Reviewer</th>
                <th>Review</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!!reviews.length && this.renderReviews()}
              {reviews.length === 0 && this.renderEmptyState()}
            </tbody>
          </table>
          {/* <Link to={`/employees/add`}>Add Review</Link> */}
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
)(EmployeeReviews);
