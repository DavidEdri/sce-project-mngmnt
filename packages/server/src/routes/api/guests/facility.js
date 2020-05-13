import express from "express";
import Facility from "../../../models/Facility";
import { errorHandler } from "../../../utils/functions";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const facility = await Facility.findById(id).populate(
      "comments.user",
      "name avatar"
    );

    if (!facility) return res.status(400).json({ msg: "Invalid Facility id" });

    return res.status(200).json(facility);
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

export default router;
