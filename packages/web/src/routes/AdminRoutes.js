import AdminHome from "../components/admin/Home";
import Users from "../components/admin/tables/Users";
import FacilityManagers from "../components/admin/tables/FacilityManagers";

const routes = [
  {
    path: "/admin",
    component: AdminHome,
  },
  {
    path: "/admin/users",
    component: Users,
  },
  {
    path: "/admin/facilityManagers",
    component: FacilityManagers,
  },
];

export default routes;
