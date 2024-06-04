import { Router } from "express"; 
<<<<<<< HEAD
import { listarResultados, registrarResultados, actualizarResultado, desactivarResultado, buscarResultados } from "../controllers/controller.resultados.js"; 
=======
import { listarResultados, registrarResultados, actualizarResultado, desactivarResultado, buscarResultados, activarResultado, registrarSensorial } from "../controllers/controller.resultados.js"; 
>>>>>>> bd7cf970a84201137220e80af21e9d4ee8d22311
import { validarResultados } from "../../validate/resultados.validate.js";
import { validarToken } from "../controllers/seguridad.controller.js";

const routeResultados = Router()

routeResultados.get('/listar',validarToken, listarResultados)
routeResultados.post('/registrar', validarToken, registrarResultados)
routeResultados.post('/sensorial', validarToken, registrarSensorial)
routeResultados.put('/actualizar/:id', validarToken, validarResultados, actualizarResultado)
routeResultados.put('/desactivar/:idResultado',validarToken, desactivarResultado)
routeResultados.get('/buscar/:idResultado',validarToken, buscarResultados)

export default routeResultados