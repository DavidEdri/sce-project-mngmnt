import jwtDecode from "jwt-decode";
import { setAuthToken } from "./functions";
import {
  logoutUser,
  refreshJwt,
  setCurrentUser,
} from "../redux/actions/authActions";
import store from "../redux";

const loadLocalStorage = () => {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwtDecode(localStorage.jwtToken);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      window.location.href = "/login";
    } else {
      store.dispatch(setCurrentUser(decoded));
      refreshJwt(store.dispatch);
    }
  }
};

export default loadLocalStorage;
