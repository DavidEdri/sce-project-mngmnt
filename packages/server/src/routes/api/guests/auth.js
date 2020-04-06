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

router.post("/activate/:token", async (req, res) => {
  const { token } = req.params;

  const user = await User.findOne({ activateToken: token });

  if (!user) return res.status(400).json("invalid token");

  user.active = true;
  user.activateToken = undefined;
  await user.save();
  return res.status(200).json("activated user");
});

router.post("/login", async (req, res) => {
  const data = pick(req.body, ["email", "password"]);
  const errors = {};

  try {
    await formsValidation.login.validate(data, { abortEarly: false });
    const user = await User.findOne({ email: data.email });

    if (!user) {
      errors.general = returnText.passOrEmailError;
      return res.status(400).json(errors);
    }

    const isMatch = await bcrypt.compare(data.password, user.password);

    if (!isMatch) {
      errors.general = returnText.passOrEmailError;
      return res.status(400).json(errors);
    }

    const payload = utilsFunctions.userToPayload(user);
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
      (err, token) => {
        if (err) {
          logError(err, req);
          return res.status(500).json({ msg: returnText.serverError });
        }
        return res
          .status(200)
          .json({ success: true, token: `Bearer ${token}` });
      }
    );
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

router.post("/resendActivateMail/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(500).json({ msg: returnText.serverError });

    user.activateToken = crypto.randomBytes(20).toString("hex");
    await user.save();

    const transporter = nodemailer.createTransport(constants.transporterOpts);

    transporter.sendMail(
      constants.registerEmail(user.email, user.activateToken),
      async (err) => {
        if (err) {
          logError(err, req);
          return res.status(500).json({ msg: returnText.serverError });
        }

        return res
          .status(200)
          .json({ msg: returnText.registerInstructions(user.email) });
      }
    );
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

export default router;
