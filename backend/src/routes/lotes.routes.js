import { Router } from "express";
import {getLotes,getLote,postLotes,desactivar_Lotes,actualizarLotes} from '..//controllers/lotes.controller.js'
import { validarLotes } from "../../validate/lotes.validate.js";
import { validarActLotes } from "../../validate/lotes.validate.js";

const routerLotes = Router()
routerLotes.get("/listar",getLotes)
routerLotes.get("/buscar/:codigo",getLote)
routerLotes.post("/registrar",validarLotes,postLotes)
routerLotes.put("/desactivar/:codigo",desactivar_Lotes)
routerLotes.put('/actualizar/:codigo',validarActLotes,actualizarLotes)
export default routerLotes;