import { Router } from "express";
import { getFincas, getFinca, postFincas, desactivar_Fincas, actualizarFincas,activar_Fincas,getBuscarIdCaficultor } from '../controllers/fincas.controller.js';
import { validarFincas } from "../../validate/fincas.validate.js";
import { } from "../controllers/seguridad.controller.js";

const routerFincas = Router();

routerFincas.get("/listar", getFincas);
routerFincas.get("/buscar/:codigo", getFinca);
routerFincas.get("/buscarCafi/:fk_caficultor",getBuscarIdCaficultor)
routerFincas.post("/registrar", validarFincas,postFincas);
 routerFincas.put("/desactivar/:codigo", desactivar_Fincas);
 routerFincas.put("/activar/:codigo", activar_Fincas);
routerFincas.put("/actualizar/:codigo",validarFincas,actualizarFincas);

export default routerFincas;
