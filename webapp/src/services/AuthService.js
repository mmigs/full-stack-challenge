import api from "../api/Api";
import store from "../store";
import {
  setToken as setAppToken,
  setUser as setAppUser
} from "../actions/appActions";
import { STORAGE_TOKEN } from "../constants";

const login = (email, password) => {
  // Get a token from api server using the fetch api
  return api
    .post("/login", {
      email,
      password
    })
    .then(res => {
      if (res.data && res.data.token) {
        /* set default header */
        setToken(res.data.token);
      }
      return res.data;
    });
};

const setToken = token => {
  api.setHeader("Authorization", "Bearer " + token);
  localStorage.setItem(STORAGE_TOKEN, token);
};

const getToken = () => {
  const state = store.getState();
  const token = state.app.token;
  return localStorage.getItem(STORAGE_TOKEN) || token;
};

const logout = () => {
  api.setHeader("Authorization", "");
  localStorage.removeItem(STORAGE_TOKEN);
  store.dispatch(setAppToken(""));
  store.dispatch(setAppUser(null));
};

export default { login, setToken, getToken, logout };
