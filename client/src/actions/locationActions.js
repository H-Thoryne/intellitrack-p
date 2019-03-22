import {
  LOAD_LAST_LOCATION_REQUEST,
  LOAD_LAST_LOCATION_SUCCESS,
  LOAD_LAST_LOCATION_FAILURE,
  LOAD_ALL_LOCATIONS_REQUEST,
  LOAD_ALL_LOCATIONS_SUCCESS,
  LOAD_ALL_LOCATIONS_FAILURE,
  DELETE_ALL_LOCATIONS,
  DELETE_LAST_LOCATION,
  GET_ERRORS
} from "../actions/types";
import axios from "axios";

export const getLastLocation = assetId => async dispatch => {
  try {
    dispatch({ type: LOAD_LAST_LOCATION_REQUEST });
    const { data } = await axios.get(`/api/locations/last/${assetId}`);
    dispatch({ type: LOAD_LAST_LOCATION_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: LOAD_LAST_LOCATION_FAILURE });
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const getAllLocations = assetId => async dispatch => {
  try {
    dispatch({ type: LOAD_ALL_LOCATIONS_REQUEST });
    const { data } = await axios.get(`/api/locations/all/${assetId}`);
    dispatch({ type: LOAD_ALL_LOCATIONS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: LOAD_ALL_LOCATIONS_FAILURE });
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const deleteLastLocation = () => ({
  type: DELETE_LAST_LOCATION
});

export const deleteAllLocations = () => ({
  type: DELETE_ALL_LOCATIONS
});
