import express from "express";
import Report from "../../../models/Report";
import { errorHandler } from "../../../utils/functions";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reports = await Report.find({
      to: req.user.manages,
    });

    return res.status(200).json(reports);
  } catch (error) {
    const { json, status } = errorHandler(error, req);
    return res.status(status).json(json);
  }
});

export default router;
