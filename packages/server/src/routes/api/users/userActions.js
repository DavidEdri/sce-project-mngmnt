import express from "express";
import jwt from "jsonwebtoken";
import multer from "multer";
import { functions, validation } from "@project/common";
import User from "../../../models/User";
import returnText from "../_text";
import { userToPayload, errorHandler } from "../../../utils/functions";
import { uploadFileArray } from "../../../utils/s3";

const router = express.Router();

router.get("/refreshjwt", async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw "no user";

    const payload = userToPayload(user);

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
      (err, token) => {
        return res.json({ success: true, token: `Bearer ${token}` });
      }
    );
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

router.post("/editInfo", multer().single("avatar"), async (req, res) => {
  const { email } = req.user;
  const { name, passwords } = req.body;
  const { password, password2 } = JSON.parse(passwords);
  const avatar = req.file;

  try {
    await validation.inputs
      .requiredField("name")
      .validate({ name }, { abortEarly: false });

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).json({ msg: returnText.serverError });
    }

    if (password !== "" || password2 !== "") {
      try {
        await validation.inputs.passwordConfirm.validate(
          { password, password2 },
          { abortEarly: false }
        );
      } catch (error) {
        return res
          .status(400)
          .json({ passwords: functions.yupErrorsToObj(error) });
      }

      user.password = password;
    }

    if (avatar) {
      const avatarUrl = await uploadFileArray([avatar], req.user._id);
      [user.avatar] = avatarUrl;
    }

    user.name = name;
    await user.save();

    return res.status(200).json("success");
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

export default router;
