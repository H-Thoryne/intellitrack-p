import {
  LOAD_ALL_LOCATIONS_FAILURE,
  LOAD_ALL_LOCATIONS_REQUEST,
  LOAD_ALL_LOCATIONS_SUCCESS,
  LOAD_LAST_LOCATION_FAILURE,
  LOAD_LAST_LOCATION_REQUEST,
  LOAD_LAST_LOCATION_SUCCESS,
  DELETE_ALL_LOCATIONS,
  DELETE_LAST_LOCATION
} from "../actions/types";

const initState = {
  lastLocation: null,
  allLocations: null,
  isLoading: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOAD_ALL_LOCATIONS_FAILURE:
      return { ...state, isLoading: false };
    case LOAD_ALL_LOCATIONS_REQUEST:
      return { ...state, isLoading: true };
    case LOAD_ALL_LOCATIONS_SUCCESS:
      return { ...state, isLoading: false, allLocations: action.payload };
    case LOAD_LAST_LOCATION_FAILURE:
      return { ...state, isLoading: false };
    case LOAD_LAST_LOCATION_REQUEST:
      return { ...state, isLoading: true };
    case LOAD_LAST_LOCATION_SUCCESS:
      return { ...state, isLoading: false, lastLocation: action.payload };
    case DELETE_ALL_LOCATIONS:
      return { ...state, allLocations: null };
    case DELETE_LAST_LOCATION:
      return { ...state, lastLocation: null };

    default:
      return state;
  }
};
