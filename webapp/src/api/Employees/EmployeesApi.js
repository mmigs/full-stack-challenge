import api from "../Api";

const getAllEmployees = () => {
  return api.get("/employees").then(res => {
    return res.data;
  });
};

const getEmployeeById = employeeId => {
  return api.get("/employees/" + employeeId).then(res => {
    return res.data;
  });
};

const saveEmployee = employeeData => {
  var apiData = {
    ...employeeData
  };
  delete apiData.createdAt;
  delete apiData.editMode;
  delete apiData.employee;
  delete apiData.message;
  delete apiData.reviews;
  delete apiData.updatedAt;
  delete apiData.passwordConfirm;

  if (employeeData.id) {
    /* create new employee */
    return api.put("/employees/" + employeeData.id, apiData).then(res => {
      return res.data;
    });
  } else {
    /* create new employee */
    return api.post("/employees", apiData).then(res => {
      return res.data;
    });
  }
};

export default {
  getAll: getAllEmployees,
  getById: getEmployeeById,
  save: saveEmployee
};
