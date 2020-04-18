import guestsRoutes from "./mapping/guestsRoutes";

export default (app, passportMiddleware) => {
  // open to all
  app.use("/guests", guestsRoutes);
};
