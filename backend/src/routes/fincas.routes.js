import { Router } from "express";
import {getFincas,getFinca,postFincas,activar_desactivar_Fincas,actualizarFincas} from '..//controllers/fincas.controller.js';

const router = Router()
router.get("/finca",getFincas)
router.get("/finca/:codigo",getFinca)
router.post("/finca",postFincas)
router.put("/finca/:codigo",activar_desactivar_Fincas)
router.patch("/finca/:codigo",actualizarFincas)

export default router;