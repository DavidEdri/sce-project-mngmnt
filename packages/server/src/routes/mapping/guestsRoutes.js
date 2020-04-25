import { Router } from "express";
import auth from "../api/guests/auth";
import facility from "../api/guests/facility";

const router = Router();

router.use("/auth", auth);
router.use("/facility", facility);

export default router;
