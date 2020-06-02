import express from "express";
import { validation } from "@project/common";
import Message from "../../../models/Message";
import { errorHandler } from "../../../utils/functions";

const router = express.Router();

router.get("/", async (req, res) => {
  const { _id: userID } = req.user;

  try {
    const messages = await Message.find({ to: userID }).populate(
      "from",
      "name avatar"
    );

    return res.status(200).json(messages);
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

router.post("/", async (req, res) => {
  const { _id: userID } = req.user;
  const { message, to } = req.body;
  const data = { from: userID, message, to };

  try {
    await validation.forms.message.validate(data, { abortEarly: false });

    const newMessage = new Message(data);
    await newMessage.save();

    return res.status(200).json({ msg: "Message sent successfully" });
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

export default router;
