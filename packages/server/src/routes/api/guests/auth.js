import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import moment from "moment";
import nodemailer from "nodemailer";
import { validation, functions } from "@project/common";
import returnText from "../_text";
import { constants, functions as utilsFunctions, logger } from "../../../utils";
import User from "../../../models/User";

const router = express.Router();
const formsValidation = validation.forms;
const { logError } = logger;
const { pick, ignore } = functions;
const { errorHandler } = utilsFunctions;

router.post("/register", async (req, res) => {
  const data = pick(req.body, ["email", "password", "password2", "name"]);
  const errors = {};

  try {
    await formsValidation.register.validate(data, { abortEarly: false });
    const user = await User.findOne({ email: data.email });

    if (user) {
      errors.email = returnText.emailExist;
      return res.status(400).json(errors);
    }

    const newUser = new User({
      ...ignore(data, ["password2"]),
      activateToken: crypto.randomBytes(20).toString("hex"),
    });

    const transporter = nodemailer.createTransport(constants.transporterOpts);

    transporter.sendMail(
      constants.registerEmail(newUser.email, newUser.activateToken),
      async (err) => {
        if (err) {
          logError(err, req);
          return res.status(500).json({ msg: returnText.serverError });
        }

        await newUser.save();
        return res
          .status(200)
          .json({ msg: returnText.registerInstructions(newUser.email) });
      }
    );
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

export default router;
