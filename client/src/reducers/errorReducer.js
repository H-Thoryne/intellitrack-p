import { GET_ERRORS, RESET_ERRORS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case RESET_ERRORS:
      return {};
    default:
      return state;
  }
};
