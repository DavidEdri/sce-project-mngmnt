import axios from "axios";
import store from "../redux";
import { logout } from "../redux/actions/authActions";
import { openSnackbar } from "../redux/actions/utilsActions";
import text from "./_text";

const applyAxiosConfig = () => {
  try {
    axios.interceptors.response.use(
      (response) => {
        switch (response.status) {
          case 200:
            if (gotMsg(response.data)) {
              showMsg(response.data.msg, "success");
            }
            break;
          default:
            break;
        }
        return response;
      },
      (error) => {
        const { status, data } = error.response;
        switch (status) {
          case 401:
            store.dispatch(logout());
            window.location.href = "/login";
            break;

          case 400:
            if (gotMsg(data)) {
              showMsg(data.msg, "error");
            }
            break;

          case 500:
            showMsg(text.serverError, "error");
            break;

          default:
            break;
        }

        return Promise.reject(error);
      }
    );
  } catch (e) {
    showMsg(text.serverError, "error");
  }
};

const gotMsg = (obj) =>
  typeof obj === "object" && "msg" in obj && typeof obj.msg === "string";

const showMsg = (msg, type) => {
  store.dispatch(openSnackbar(msg, type));
};

export default applyAxiosConfig;
