import { Router } from "express"; 
import { listarResultados, registrarResultados, actualizarResultado, desactivarResultado, buscarResultados, activarResultado, registrarSensorial, actualizarSensorial, cargarImagen, listarResultadosFisicos, listarResultadosSensorialesCatador, listarResultadosSensorialesSelect } from "../controllers/controller.resultados.js"; 
import { validarResultados } from "../../validate/resultados.validate.js";
import { validarToken } from "../controllers/seguridad.controller.js";

const routeResultados = Router()

routeResultados.get('/listar/:id',validarToken, listarResultados)
routeResultados.post('/registrar', validarToken, registrarResultados)
routeResultados.post('/sensorial', validarToken, registrarSensorial)
routeResultados.put('/actualizar/:id', validarToken, actualizarResultado)
routeResultados.put('/actualizarSensory/:id', validarToken, actualizarSensorial)
routeResultados.put('/desactivar/:idResultado',validarToken, desactivarResultado)
routeResultados.get('/buscar/:idResultado',validarToken, buscarResultados)
routeResultados.put('/activar/:id',validarToken, activarResultado)
routeResultados.get('/fisicos/:id',validarToken, listarResultadosFisicos)
routeResultados.get('/sensorialCatador/:id',validarToken, listarResultadosSensorialesCatador)
routeResultados.get('/sensorialSelect',validarToken, listarResultadosSensorialesSelect)

export default routeResultados