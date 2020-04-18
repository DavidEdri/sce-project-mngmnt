import AdminHome from "../components/admin/Home";
import Users from "../components/admin/tables/Users";

const routes = [
  {
    path: "/admin",
    component: AdminHome
  },
  {
    path: "/admin/users",
    component: Users
  }
];

export default routes;
