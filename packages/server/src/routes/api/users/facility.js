import express from "express";
import Facility from "../../../models/Facility";
import { errorHandler } from "../../../utils/functions";

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

export default router;
