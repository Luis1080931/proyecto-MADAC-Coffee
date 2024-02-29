import { Router } from "express";
import {getLotes,getLote,postLotes,desactivar_Lotes,actualizarLotes} from '..//controllers/lotes.controller.js'
import { validarLotes } from "../../validate/lotes.validate.js";


const routeLotes = Router()
routeLotes.get("/listar",getLotes)
routeLotes.get("/buscar/:codigo",getLote)
routeLotes.post("/registrar", validarLotes,postLotes)
routeLotes.put("/desactivar/:codigo",desactivar_Lotes)
routeLotes.put('/actualizar/:codigo',validarLotes ,actualizarLotes)
export default routeLotes;