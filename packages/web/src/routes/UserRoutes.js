import DashboardHome from "../components/dashboard/Home";
import Profile from "../components/dashboard/profile";

const routes = [
  {
    path: "/dashboard",
    component: DashboardHome
  },
  {
    path: "/dashboard/profile/:field",
    component: Profile
  }
];

export default routes;
