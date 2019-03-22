import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import assetReducer from "./assetReducer";
import locationReducer from "./locationReducer";
import notificationReducer from "./notificationReducer";
import projectReducer from "./projectReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  locations: locationReducer,
  assets: assetReducer,
  notifications: notificationReducer,
  projects: projectReducer
});

export default rootReducer;
