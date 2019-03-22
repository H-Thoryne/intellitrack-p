import setAuthHeader from "./setAuthHeader";
import jwt_decode from "jwt-decode";
import { logoutUser, setUser } from "../actions/authActions";

export default store => {
  // Check for Token
  if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthHeader(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser());
      // Redirect to login
      window.location.href = "/login";
    }
  }
};
