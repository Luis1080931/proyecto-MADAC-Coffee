import { Router } from "express"; 
import { listarResultados, registrarResultados, actualizarResultado, desactivarResultado, buscarResultados, activarResultado } from "../controllers/controller.resultados.js"; 
import { validarResultados } from "../../validate/resultados.validate.js";
import { validarToken } from "../controllers/seguridad.controller.js";

const routeResultados = Router()

routeResultados.get('/listar',validarToken, listarResultados)
routeResultados.post('/registrar', validarToken, registrarResultados)
routeResultados.put('/actualizar/:id', validarToken, validarResultados, actualizarResultado)
routeResultados.put('/desactivar/:idResultado',validarToken, desactivarResultado)
routeResultados.get('/buscar/:idResultado',validarToken, buscarResultados)
routeResultados.put('/activar/:id',validarToken, activarResultado)

export default routeResultados