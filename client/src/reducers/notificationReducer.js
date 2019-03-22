import { SET_NOTIFICATION } from "../actions/types";

const initState = {
  message: null,
  alertType: null
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      if (!action.payload) return { message: null, alertType: null };
      return {
        message: action.payload.message,
        alertType: action.payload.alertType
      };
    default:
      return state;
  }
};
