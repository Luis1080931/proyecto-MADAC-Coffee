import { Router } from "express";
import {getFincas,getFinca,postFincas,desactivar_Fincas,actualizarFincas} from '..//controllers/fincas.controller.js';

const routerFincas = Router()
routerFincas.get("/listar",getFincas)
routerFincas.get("/buscar/:codigo",getFinca)
routerFincas.post("/registrar",postFincas)
routerFincas.put("/desactivar/:codigo",desactivar_Fincas)
routerFincas.patch("/actualizar/:codigo",actualizarFincas)
export default routerFincas;