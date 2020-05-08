import express from "express";
import { validation, constants } from "@project/common";
import User from "../../../models/User";
import Facility from "../../../models/Facility";
import { errorHandler } from "../../../utils/functions";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const managers = await User.find({
      manages: { $exists: true },
      rank: { $gte: constants.facilityManagerRank },
    })
      .populate("manages", "name")
      .select("-password");

    return res.status(200).json(managers);
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

// Assign user to manage facility
router.post("/", async (req, res) => {
  const { user, facility } = req.body;

  try {
    await validation.forms.adminAssignFacility.validate(
      { user, facility },
      { abortEarly: false }
    );

    const u = await User.findById(user);
    const f = await Facility.findById(facility);
    if (!u || !f) throw new Error("assign user to facility error");

    u.manages = facility;
    f.manager = user;
    await u.save();
    await f.save();

    const populated = await User.findById(user).populate("manages", "name");
    return res.status(200).json(populated);
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

// Remove manager from facility
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) throw new Error("remove user from facility error");

    const f = await Facility.findOne({ manager: id });

    if (f) {
      f.manager = undefined;
      await f.save();
    }

    user.manages = undefined;
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

router.get("/canManage", async (req, res) => {
  try {
    const users = await User.find({
      rank: { $gte: constants.facilityManagerRank },
      manages: { $exists: false },
    }).select("_id name");
    const facilities = await Facility.find({
      manager: { $exists: false },
    }).select("_id name");

    return res.status(200).json({ users, facilities });
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

export default router;
