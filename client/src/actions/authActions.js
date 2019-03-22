import { SET_USER, LOGOUT_USER } from "./types";
import axios from "axios";
import { getErrors, resetErrors } from "./errorActions";
import setAuthHeader from "../utils/setAuthHeader";
import { navigate } from "@reach/router";
import jwt_decode from "jwt-decode";
import { setNotification } from "./notificationActions";

// Login
export const loginUser = userData => async dispatch => {
  try {
    // Get auth token from server
    const {
      data: { token }
    } = await axios.post("/api/users/login", userData);
    // Set token in LS
    localStorage.setItem("jwtToken", token);
    // Set auth header in axios
    setAuthHeader(token);
    // Remove errors
    dispatch(resetErrors());
    // decode token then set user in state
    const decoded = jwt_decode(token);
    dispatch(setUser(decoded));
    // clear notifications
    dispatch(setNotification());
  } catch (err) {
    return dispatch(getErrors(err.response.data));
  }
};

// Set user in state
export const setUser = decoded => ({
  type: SET_USER,
  payload: decoded
});

// Logout
export const logoutUser = () => dispatch => {
  // Remove token from LS
  localStorage.removeItem("jwtToken");
  // Remove auth header
  setAuthHeader();
  // Redirect to login screen
  dispatch({ type: LOGOUT_USER });
  navigate("/login");
};

export const keepUserLoggedInOnNavigate = () => dispatch => {
  if (localStorage.jwtToken) {
    setAuthHeader(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    dispatch(setUser(decoded));
    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      dispatch(setNotification({message: "A munkamenet lejárt!", alertType: "danger"}))
      // Logout user
      dispatch(logoutUser());
    }
  }
};
