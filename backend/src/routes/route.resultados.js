import { Router } from "express"; 
<<<<<<< HEAD
import { listarResultados, registrarResultados, actualizarResultado, desactivarResultado, buscarResultados, registrarSensorial } from "../controllers/controller.resultados.js"; 
=======
import { listarResultados, registrarResultados, actualizarResultado, desactivarResultado, buscarResultados, activarResultado, registrarSensorial, actualizarSensorial, cargarImagen } from "../controllers/controller.resultados.js"; 
>>>>>>> 35b79d311e3ddee305816e4c1a1145a95e0ef90d
import { validarResultados } from "../../validate/resultados.validate.js";
import { validarToken } from "../controllers/seguridad.controller.js";

const routeResultados = Router()

routeResultados.get('/listar',validarToken, listarResultados)
routeResultados.post('/registrar', validarToken, registrarResultados)
routeResultados.post('/sensorial', validarToken, cargarImagen, registrarSensorial)
routeResultados.put('/actualizar/:id', validarToken, actualizarResultado)
routeResultados.put('/actualizarSensory/:id', validarToken, actualizarSensorial)
routeResultados.put('/desactivar/:idResultado',validarToken, desactivarResultado)
routeResultados.get('/buscar/:idResultado',validarToken, buscarResultados)

export default routeResultados