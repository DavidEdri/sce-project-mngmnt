import { Router } from "express";
import userActions from "../api/users/userActions";
import facility from "../api/users/facility";
import messages from "../api/users/messages";

const router = Router();

router.use("/userActions", userActions);
router.use("/facility", facility);
router.use("/messages", messages);

export default router;
