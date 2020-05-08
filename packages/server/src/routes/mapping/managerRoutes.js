import { Router } from "express";
import edit from '../api/managers/edit'


const router = Router();

router.use("/edit", edit);

export default router;
