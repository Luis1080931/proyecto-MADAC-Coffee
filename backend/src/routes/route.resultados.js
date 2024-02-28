import { Router } from "express"; 
import { listarResultados, registrarResultados, actualizarResultado, desactivarResultado, buscarResultados } from "../controllers/controller.resultados.js"; 
import { validarResultados } from "../../validate/resultados.validate.js";

const routeResultados = Router()

routeResultados.get('/listar', listarResultados)
routeResultados.post('/registrar',validarResultados, registrarResultados)
routeResultados.put('/actualizar/:id',validarResultados, actualizarResultado)
routeResultados.put('/desactivar/:idResultado', desactivarResultado)
routeResultados.get('/buscar/:idResultado', buscarResultados)

export default routeResultados