import { Router } from "express";
import {getLotes,getLote,postLotes,activar_desactivar_Lotes,actualizarLotes} from '..//controllers/lotes.controller.js'

const routeLotes = Router()
routeLotes.get("/listar",getLotes)
routeLotes.get("/buscar/:codigo",getLote)
routeLotes.post("/registrar",postLotes)
routeLotes.put("/desactivar/:codigo",activar_desactivar_Lotes)
routeLotes.put('/actualizar/:codigo',actualizarLotes)
export default routeLotes;