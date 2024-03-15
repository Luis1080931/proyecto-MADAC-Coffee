import { Router } from "express"; 
import { listarResultados, registrarResultados, actualizarResultado, desactivarResultado, buscarResultados } from "../controllers/controller.resultados.js"; 
import { validarResultados } from "../../validate/resultados.validate.js";
import { validarToken } from "../controllers/seguridad.controller.js";

const routeResultados = Router()

routeResultados.get('/listar',validarToken, listarResultados)
routeResultados.post('/registrar',validarToken, validarResultados, registrarResultados)
routeResultados.put('/actualizar/:id',validarToken, validarResultados, actualizarResultado)
routeResultados.put('/desactivar/:idResultado',validarToken, desactivarResultado)
routeResultados.get('/buscar/:idResultado',validarToken, buscarResultados)

export default routeResultados