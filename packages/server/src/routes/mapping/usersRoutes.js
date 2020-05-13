import { Router } from "express";
import userActions from "../api/users/userActions";
import facility from "../api/users/facility";

const router = Router();

router.use("/userActions", userActions);
router.use("/facility", facility);

export default router;
