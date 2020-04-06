import GuestHome from "../components/guest/Home";
import Register from "../components/auth/Register";

const routes = [
  {
    path: "/",
    component: GuestHome,
  },
  {
    path: "/register",
    component: Register,
  },
];

export default routes;
