import { Router } from "express";
import { getFincas, getFinca, postFincas, desactivar_Fincas, actualizarFincas, activarFinca } from '../controllers/fincas.controller.js';
import { validarFincas } from "../../validate/fincas.validate.js";
import { validarToken } from "../controllers/seguridad.controller.js";

const routerFincas = Router();

routerFincas.get("/listar",validarToken, getFincas);
routerFincas.get("/buscar/:codigo",validarToken, getFinca);
routerFincas.post("/registrar", validarFincas,postFincas);
 routerFincas.put("/desactivar/:codigo",validarToken, desactivar_Fincas)
 routerFincas.put("/activar/:id",validarToken, activarFinca)
routerFincas.put("/actualizar/:codigo",validarFincas,actualizarFincas);

export default routerFincas;
