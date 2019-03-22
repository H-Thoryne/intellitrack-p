import /* Later... */ "../actions/types";
import {
  LOAD_ALL_PROJECTS_FAILURE,
  LOAD_ALL_PROJECTS_SUCCESS,
  LOAD_ALL_PROJECTS_REQUEST
} from "../actions/types";

const initState = {
  current: null,
  all: null,
  isLoading: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOAD_ALL_PROJECTS_REQUEST:
      return { ...state, isLoading: true };
    case LOAD_ALL_PROJECTS_SUCCESS:
      return { ...state, isLoading: false, all: action.payload}
    case LOAD_ALL_PROJECTS_FAILURE:
    default:
      return state;
  }
};
