import { Router } from "express";
import usersMangement from "../api/admins/usersMangement";
import facilityManagers from "../api/admins/facilityManagers";

const router = Router();

router.use("/usersMangement", usersMangement);
router.use("/facilityManagers", facilityManagers);

export default router;
