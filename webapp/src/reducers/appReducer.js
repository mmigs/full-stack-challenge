const userReducer = (
  state = {
    token: "",
    user: null
  },
  action
) => {
  switch (action.type) {
    case "SET_TOKEN":
      state = {
        ...state,
        token: action.payload
      };
      break;
    case "SET_USER":
      state = {
        ...state,
        user: action.payload
      };
      break;
    default:
      break;
  }
  return state;
};

export default userReducer;
