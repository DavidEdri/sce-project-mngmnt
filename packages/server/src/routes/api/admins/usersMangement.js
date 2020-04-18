import express from "express";
import { functions, validation } from "@project/common";
import User from "../../../models/User";
import returnText from "../_text";
import { userToApi, errorHandler } from "../../../utils/functions";

const router = express.Router();
const { pick, ignore } = functions;

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json(users);
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

router.post("/", async (req, res) => {
  const data = pick(req.body, [
    "name",
    "email",
    "rank",
    "password",
    "password2",
    "active",
  ]);

  const errors = {};
  try {
    await validation.forms.adminAddUser.validate(data, { abortEarly: false });
    const user = await User.findOne({ email: data.email });

    if (user) {
      errors.general = returnText.emailExist;
      return res.status(400).json(errors);
    }

    const newUser = new User(ignore(data, ["password2"]));

    await newUser.save();

    return res.status(200).json(userToApi(newUser));
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      return res.status(400).json({ msg: returnText.serverError });
    }

    return res.status(200).json("success");
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const data = pick(req.body, ["name", "rank", "active"]);

  try {
    await validation.forms.adminEditUser.validate(data, { abortEarly: false });

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ msg: returnText.serverError });
    }

    user.name = data.name;
    user.rank = data.rank;
    user.active = data.active;

    await user.save();

    return res.status(200).json(userToApi(user));
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

router.post("/changePass/:id", async (req, res) => {
  const { id } = req.params;
  const data = pick(req.body, ["password", "password2"]);

  try {
    await validation.inputs.passwordConfirm.validate(data, {
      abortEarly: false,
    });

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ msg: returnText.serverError });
    }

    user.password = data.password;
    await user.save();

    return res.status(200).json("success");
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

export default router;
