import { create } from "apisauce";
import { API_ROOT, API_TIMEOUT } from "../constants";
import EmployeesApi from "./Employees/EmployeesApi";

const api = create(
  {
    baseURL: API_ROOT,
    timeout: API_TIMEOUT
  },
  {},
  {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
);

export default api;
export { EmployeesApi };
