import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import passport from "passport";

import { logger } from "./utils/logger";
import routes from "./routes";
import passportConfig from "./config/passport"; // need to load after routes

const app = express();
const publicFolder = path.join(__dirname, "public");
const db =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info("DB Connectd"))
  .catch(err => logger.error(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(publicFolder)); // serve static folder
app.use(passport.initialize());

passportConfig(passport);

routes(app, passport.authenticate("jwt", { session: false }));

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: publicFolder });
});

export default app;
