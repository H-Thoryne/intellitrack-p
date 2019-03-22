import {
  LOAD_ASSETS_REQUEST,
  LOAD_ASSETS_SUCCESS,
  LOAD_ASSETS_FAILURE,
  GET_ERRORS,
  LOAD_CURRENT_ASSET_REQUEST,
  LOAD_CURRENT_ASSET_SUCCESS,
  LOAD_CURRENT_ASSET_FAILURE,
  DELETE_CURRENT_ASSET,
  CREATE_NEW_ASSET_REQUEST,
  CREATE_NEW_ASSET_SUCCESS,
  CREATE_NEW_ASSET_FAILURE,
  MODIFY_ASSET_REQUEST,
  MODIFY_ASSET_SUCCESS,
  MODIFY_ASSET_FAILURE
} from './types';
import axios from 'axios';
import { navigate } from '@reach/router';
import { setNotification } from './notificationActions';

// Fetch multiple assets
export const fetchAssets = (page, limit) => async dispatch => {
  try {
    dispatch({ type: LOAD_ASSETS_REQUEST });
    const { data } = await axios.get(`/api/assets/multiple/${page}/${limit}`);
    dispatch({ type: LOAD_ASSETS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: LOAD_ASSETS_FAILURE });
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

// Fetch single asset by ID
export const fetchCurrentAsset = id => async dispatch => {
  try {
    dispatch({ type: LOAD_CURRENT_ASSET_REQUEST });
    const { data } = await axios.get(`/api/assets/single/${id}`);
    dispatch({ type: LOAD_CURRENT_ASSET_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: LOAD_CURRENT_ASSET_FAILURE });
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const deleteCurrentAsset = () => ({
  type: DELETE_CURRENT_ASSET
});

export const createNewAsset = asset => async dispatch => {
  try {
    dispatch({ type: CREATE_NEW_ASSET_REQUEST });
    await axios.post(`/api/assets/`, asset);
    dispatch({ type: CREATE_NEW_ASSET_SUCCESS });
    dispatch(setNotification({message: "Eszköz sikeresen hozzáadva", alertType: "success"}))
    navigate('/assets');
  } catch (err) {
    dispatch({ type: CREATE_NEW_ASSET_FAILURE });
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};

export const editCurrentAsset = asset => async dispatch => {
  try {
    dispatch({ type: MODIFY_ASSET_REQUEST });
    await axios.put(`/api/assets/single/${asset.id}`, asset);
    dispatch({ type: MODIFY_ASSET_SUCCESS });
    navigate('/assets');
  } catch (err) {
    dispatch({ type: MODIFY_ASSET_FAILURE });
    dispatch({ type: GET_ERRORS, payload: err.response.data });
  }
};
