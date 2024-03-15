import { Router } from "express";
import { getFincas, getFinca, postFincas, desactivar_Fincas, actualizarFincas } from '../controllers/fincas.controller.js';
import { validarFincas } from "../../validate/fincas.validate.js";
import { validarToken } from "../controllers/seguridad.controller.js";

const routerFincas = Router();

routerFincas.get("/listar",validarToken, getFincas);
routerFincas.get("/buscar/:codigo",validarToken, getFinca);
routerFincas.post("/registrar",validarToken, validarFincas,postFincas);
 routerFincas.put("/desactivar/:codigo",validarToken, desactivar_Fincas);
routerFincas.put("/actualizar/:codigo",validarToken, validarFincas,actualizarFincas);

export default routerFincas;
