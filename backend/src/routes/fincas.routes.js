import { Router } from "express";
import { getFincas, getFinca, postFincas, desactivar_Fincas, actualizarFincas } from '../controllers/fincas.controller.js';
import { validarActFincas } from "../../validate/fincas.validate.js";
import { validarFincas } from "../../validate/fincas.validate.js";

const routerFincas = Router();

routerFincas.get("/listar", getFincas);
routerFincas.get("/buscar/:codigo", getFinca);
routerFincas.post("/registrar",validarFincas,postFincas);
 routerFincas.put("/desactivar/:codigo",desactivar_Fincas);
routerFincas.put("/actualizar/:codigo",validarActFincas,actualizarFincas);

export default routerFincas;
