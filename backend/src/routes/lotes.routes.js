import { Router } from "express";
import {getLotes,getLote,postLotes,desactivar_Lotes,actualizarLotes} from '..//controllers/lotes.controller.js'
import { validarLotes } from "../../validate/lotes.validate.js";
import { validarToken } from "../controllers/seguridad.controller.js";


const routeLotes = Router()
routeLotes.get("/listar", getLotes)
routeLotes.get("/buscar/:codigo", getLote)
routeLotes.post("/registrar",postLotes)
routeLotes.put("/desactivar/:codigo", desactivar_Lotes)
routeLotes.put('/actualizar/:codigo' ,actualizarLotes)
export default routeLotes;