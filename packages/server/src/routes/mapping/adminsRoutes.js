import { Router } from "express";
import usersMangement from "../api/admins/usersMangement";

const router = Router();

router.use("/usersMangement", usersMangement);

export default router;
