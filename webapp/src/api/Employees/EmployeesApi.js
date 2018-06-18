import api from "../Api";

const getAllEmployees = () => {
  // Get a token from api server using the fetch api
  return api.get("/employees").then(res => {
    return res.data;
  });
};

export default { getAll: getAllEmployees };
