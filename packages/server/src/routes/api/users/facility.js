import express from "express";
import Facility from "../../../models/Facility";
import { errorHandler } from "../../../utils/functions";
import User from "../../../models/User";

const router = express.Router();

router.post("/comment", async (req, res) => {
  const { _id } = req.user;
  const { comment, facilityID } = req.body;

  try {
    const facility = await Facility.findById(facilityID);

    if (!facility) return res.status(400).json({ msg: "facility not found!" });

    const newComment = { user: _id, comment };
    facility.comments.unshift(newComment);
    await facility.save();
    return res.status(200).json(newComment);
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

router.put("/favorite", async (req, res) => {
  const { _id } = req.user;
  const { facilityID } = req.body;

  try {
    const facility = await Facility.findById(facilityID);

    if (!facility) return res.status(400).json({ msg: "facility not found!" });

    const user = await User.findById(_id);

    if (!user) return res.status(400).json({ msg: "user not found!" });

    if (user.favorites) user.favorites.push(facilityID);
    else user.favorites = [facilityID];

    await user.save();

    return res.status(200).json("succsess");
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

router.delete("/favorite/:fid", async (req, res) => {
  const { fid } = req.params;
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);

    if (!user) return res.status(400).json({ msg: "user not found!" });
    user.favorites = user.favorites.filter((f) => f !== fid);
    await user.save();

    return res.status(200).json("succsess");
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

export default router;
