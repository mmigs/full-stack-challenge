export function setToken(token) {
  return {
    type: "SET_TOKEN",
    payload: token
  };
}

export function unsetToken() {
  return {
    type: "SET_TOKEN",
    payload: ""
  };
}

export function setUser(user) {
  return {
    type: "SET_USER",
    payload: user
  };
}

export function unsetUser() {
  return {
    type: "SET_USER",
    payload: null
  };
}
