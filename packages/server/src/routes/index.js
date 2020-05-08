import adminsRoutes from "./mapping/adminsRoutes";
import guestsRoutes from "./mapping/guestsRoutes";
import usersRoutes from "./mapping/usersRoutes";
import managerRoutes from './mapping/managerRoutes'
import { isAdmin, isActive, isManager } from "../middleware";

export default (app, passportMiddleware) => {
  // open to all
  app.use("/guests", guestsRoutes);
  // loggedin and active
  app.use("/users", passportMiddleware, isActive, usersRoutes);
  // admin
  app.use("/admins", passportMiddleware, isAdmin, adminsRoutes);
  //manager
  app.use("/managers", passportMiddleware, isManager, managerRoutes);
};
