import { Router } from "express";
import {getFincas,getFinca,postFincas,activar_desactivar_Fincas,actualizarFincas} from '..//controllers/fincas.controller.js';

const routeFincas = Router()
routeFincas.get("/listar",getFincas)
routeFincas.get("/buscar/:codigo",getFinca)
routeFincas.post("/registrar",postFincas)
routeFincas.put("/desactivar/:codigo",activar_desactivar_Fincas)
routeFincas.patch("/actualizar/:codigo",actualizarFincas)

export default routeFincas;