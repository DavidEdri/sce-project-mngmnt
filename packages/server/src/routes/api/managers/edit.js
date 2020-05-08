import express from "express";
import { validation } from "@project/common";
import Facility from "../../../models/Facility";
import { errorHandler } from "../../../utils/functions";
import { functions } from "@project/common";

const { pick } = functions
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const facility = await Facility.findOne({
            manager: req.user._id
        })
        if (!facility) return res.status(400).json({ msg: "No facility for you my friend" });

        return res.status(200).json(facility);

    } catch (error) {
        const { json, status } = errorHandler(error, req);
        return res.status(status).json(json);
    }
});

// Assign user to manage facility
router.put("/", async (req, res) => {
    const data = pick(req.body, ["name", "activity", "condition", "fencing", "handicappe", "ligthing"]);
    try {
        await validation.forms.editFacility.validate(
            data,
            { abortEarly: false }
        );

        const f = await Facility.findOne({
            manager: req.user._id
        })
        if (!f) return res.status(400).json({ msg: "No facility for you my friend" });

        f.name = data.name
        f.activity = data.activity
        f.condition = data.condition
        f.fencing = data.fencing
        f.handicappe = data.handicappe
        f.ligthing = data.ligthing

        await f.save();

        return res.status(200).json(f);
    } catch (error) {
        const { json, status } = errorHandler(error, req);
        return res.status(status).json(json);
    }
});


export default router;
