import { create } from "apisauce";

const api = create(
  {
    baseURL: "http://localhost:3000/v1/",
    timeout: 16000
  },
  {},
  {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
);

export default api;
