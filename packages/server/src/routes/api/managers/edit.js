import express from "express";
import multer from "multer";
import { validation, functions } from "@project/common";
import Facility from "../../../models/Facility";
import { errorHandler } from "../../../utils/functions";
import { uploadFileArray, deleteUrlsArray } from "../../../utils/s3";

const { pick } = functions;
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const facility = await Facility.findOne({
      manager: req.user._id,
    });
    if (!facility)
      return res.status(400).json({ msg: "No facility for you my friend" });

    return res.status(200).json(facility);
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

router.put("/", multer().array("gallery", 5), async (req, res) => {
  const data = pick(req.body, [
    "name",
    "activity",
    "condition",
    "fencing",
    "handicappe",
    "ligthing",
  ]);
  const existingImages = req.body.gallery ? req.body.gallery : [];
  const existingImagesArray = [
    ...(typeof existingImages === "string" ? [existingImages] : existingImages),
  ];
  const gallery = [...req.files, ...existingImagesArray];

  try {
    await validation.forms.editFacility.validate(
      { ...data, gallery },
      { abortEarly: false }
    );

    const f = await Facility.findOne({
      manager: req.user._id,
    });
    if (!f)
      return res.status(400).json({ msg: "No facility for you my friend" });

    const filesToUpload = gallery.filter((i) => typeof i !== "string");
    const uploaded = await uploadFileArray(filesToUpload, req.user.manages);

    const newGallery = [...existingImagesArray, ...uploaded];
    const imagesToDelete = f.gallery.filter(
      (item) => !newGallery.includes(item)
    );

    if (imagesToDelete.length > 0) await deleteUrlsArray(imagesToDelete);

    f.name = data.name;
    f.activity = data.activity;
    f.condition = data.condition;
    f.fencing = data.fencing;
    f.handicappe = data.handicappe;
    f.ligthing = data.ligthing;
    f.gallery = newGallery;

    await f.save();

    return res.status(200).json({ msg: "Success" });
  } catch (error) {
    console.log(error);
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

export default router;
