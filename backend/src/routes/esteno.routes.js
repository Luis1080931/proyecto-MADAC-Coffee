import { Router } from "express";
import {postUser} from '..//controllers/estono.controller.js'

const router = Router()
router.post("/no",postUser)

export default router;