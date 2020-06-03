import DashboardHome from "../components/dashboard/Home";
import Profile from "../components/dashboard/profile";
import Messages from "../components/dashboard/Messages";

const routes = [
  {
    path: "/dashboard",
    component: DashboardHome,
  },
  {
    path: "/dashboard/profile/:field",
    component: Profile,
  },
  {
    path: "/dashboard/Messages",
    component: Messages,
  },
];

export default routes;
