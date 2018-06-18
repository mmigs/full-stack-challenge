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
  if (employeeData.id) {
    /* create new employee */
    return api.put("/employees", employeeData).then(res => {
      return res.data;
    });
  } else {
    /* create new employee */
    return api.post("/employees", employeeData).then(res => {
      return res.data;
    });
  }
};

export default {
  getAll: getAllEmployees,
  getById: getEmployeeById,
  save: saveEmployee
};
