import { Router } from "express"; 
import { listarResultados, registrarResultados, actualizarResultado, desactivarResultado, buscarResultados } from "../controllers/controller.resultados.js"; 

const routeResultados = Router()

routeResultados.get('/listar', listarResultados)
routeResultados.post('/registrar', registrarResultados)
routeResultados.put('/actualizar/:id', actualizarResultado)
routeResultados.put('/desactivar/:idResultado', desactivarResultado)
routeResultados.get('/buscar/:idResultado', buscarResultados)

export default routeResultados