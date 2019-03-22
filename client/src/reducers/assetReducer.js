import {
  LOAD_ASSETS_FAILURE,
  LOAD_ASSETS_REQUEST,
  LOAD_ASSETS_SUCCESS,
  LOAD_CURRENT_ASSET_FAILURE,
  LOAD_CURRENT_ASSET_REQUEST,
  LOAD_CURRENT_ASSET_SUCCESS,
  DELETE_CURRENT_ASSET,
  CREATE_NEW_ASSET_REQUEST,
  CREATE_NEW_ASSET_SUCCESS,
  CREATE_NEW_ASSET_FAILURE
} from '../actions/types';

const initState = {
  items: [],
  currentItem: null,
  isLoading: false
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOAD_ASSETS_REQUEST:
      return { ...state, isLoading: true };
    case LOAD_ASSETS_SUCCESS:
      return { ...state, isLoading: false, items: action.payload };
    case LOAD_ASSETS_FAILURE:
      return { ...state, isLoading: false };
    case LOAD_CURRENT_ASSET_REQUEST:
      return { ...state, isLoading: true };
    case LOAD_CURRENT_ASSET_SUCCESS:
      return { ...state, isLoading: false, currentItem: action.payload };
    case LOAD_CURRENT_ASSET_FAILURE:
      return { ...state, isLoading: false };
    case DELETE_CURRENT_ASSET: {
      return { ...state, currentItem: null };
    }
    case CREATE_NEW_ASSET_REQUEST: {
      return { ...state, isLoading: true };
    }
    case CREATE_NEW_ASSET_SUCCESS: {
      return { ...state, isLoading: false };
    }
    case CREATE_NEW_ASSET_FAILURE: {
      return { ...state, isLoading: false };
    }
    default:
      return state;
  }
};
