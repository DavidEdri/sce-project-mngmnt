import axios from "axios";
import jwtDecode from "jwt-decode";
import { setUser } from "../slices/auth";
import { setAuthToken } from "../../utils/functions";

export const loginUser = token => {
  localStorage.setItem("jwtToken", token);
  setAuthToken(token);

  const decoded = jwtDecode(token);

  return setUser(decoded);
};

export const setCurrentUser = decoded => setUser(decoded);

export const refreshJwt = async dispatch => {
  const res = await axios.get("/users/userActions/refreshJWT");
  const { token } = res.data;

  dispatch(loginUser(token));
};

export const logoutUser = () => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  return setUser({});
};
