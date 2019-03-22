import { LOGOUT_USER, SET_USER } from "../actions/types";

const initState = {
  user: null,
  isAuthenticated: false
};

export default (state = initState, action) => {
  switch (action.type) {
    // case LOGIN_USER:
    //   return { ...state, isAuthenticated: true };
    case SET_USER:
      return { isAuthenticated: true, user: action.payload };
    case LOGOUT_USER:
      return { isAuthenticated: false, user: null };
    default:
      return state;
  }
};
