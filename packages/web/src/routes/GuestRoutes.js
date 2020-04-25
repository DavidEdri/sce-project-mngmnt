import GuestHome from "../components/guest/Home";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import ActivateAccount from "../components/auth/activate/ActivateResend";
import ValidateToken from "../components/auth/activate/ValidateToken";
import SendPwdToken from "../components/auth/password-reset/SendPwdToken";
import ChangePassword from "../components/auth/password-reset/ChangePassword";
import Facility from "../components/guest/facility";

const routes = [
  {
    path: "/",
    component: GuestHome,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/activate",
    component: ActivateAccount,
  },
  {
    path: "/activate/:token",
    component: ValidateToken,
  },
  {
    path: "/forgotPassword",
    component: SendPwdToken,
  },
  {
    path: "/passwordreset/:token",
    component: ChangePassword,
  },
  {
    path: "/facility/:id",
    component: Facility,
  },
];

export default routes;
