import { Router } from "express";
import {postVariedades} from "..//controllers/variables.controller.js"

const router = Router()
router.post("/variedades",postVariedades)

export default router;