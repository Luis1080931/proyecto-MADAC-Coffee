import { Router } from "express";
import {getLotes,getLote,postLotes,desactivar_Lotes,actualizarLotes} from '..//controllers/lotes.controller.js'

const routerLotes = Router()
routerLotes.get("/listar",getLotes)
routerLotes.get("/buscar/:codigo",getLote)
routerLotes.post("/registrar",postLotes)
routerLotes.put("/desactivar/:codigo",desactivar_Lotes)
routerLotes.patch('/actualizar/:codigo',actualizarLotes)
export default routerLotes;