import { Router } from "express";
import {getLotes,getLote,postLotes,desactivar_Lotes,actualizarLotes} from '..//controllers/lotes.controller.js'
import { validarLotes } from "../../validate/lotes.validate.js";
import { validarToken } from "../controllers/seguridad.controller.js";


const routeLotes = Router()
routeLotes.get("/listar",validarToken, getLotes)
routeLotes.get("/buscar/:codigo",validarToken, getLote)
routeLotes.post("/registrar",validarToken,  validarLotes,postLotes)
routeLotes.put("/desactivar/:codigo",validarToken, desactivar_Lotes)
routeLotes.put('/actualizar/:codigo',validarToken, validarLotes ,actualizarLotes)
export default routeLotes;