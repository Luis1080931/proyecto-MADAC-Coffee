import { Router } from "express";
import {getLotes,getLote,postLotes,activar_desactivar_Lotes,actualizarLotes} from '..//controllers/lotes.controller.js'

const router = Router()
router.get("/lotes",getLotes)
router.get("/lotes/:codigo",getLote)
router.post("/lotes",postLotes)
router.put("/lotes/:codigo",activar_desactivar_Lotes)
router.patch('/lotes/:codigo',actualizarLotes)
export default router;