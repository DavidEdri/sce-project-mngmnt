import { Router } from "express";
import edit from "../api/managers/edit";
import reports from "../api/managers/reports";

const router = Router();

router.use("/edit", edit);
router.use("/reports", reports);

export default router;
