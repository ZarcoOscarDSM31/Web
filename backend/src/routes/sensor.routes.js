import { Router } from "express";
import { getAllData, createData } from '../controllers/sensor.controller.js';

import { auth } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/getSensor", getAllData);

router.get("/createData", createData);

export default router;