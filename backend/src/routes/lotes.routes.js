import { Router } from "express";
import {getLotes,getLote,postLotes,desactivar_Lotes,actualizarLotes, lotesActivos} from '..//controllers/lotes.controller.js'
import { validarLotes } from "../../validate/lotes.validate.js";
import { validarToken } from "../controllers/seguridad.controller.js";


const routeLotes = Router()
routeLotes.get("/listar",validarToken, getLotes)
routeLotes.get("/activos",validarToken, lotesActivos)
routeLotes.get("/buscar/:codigo",validarToken, getLote)
routeLotes.post("/registrar", postLotes)
routeLotes.put("/desactivar/:codigo",validarToken, desactivar_Lotes)
routeLotes.put('/actualizar/:codigo', validarLotes ,actualizarLotes)
export default routeLotes;