import { Router } from "express"; 
import { listarResultados, registrarResultados, actualizarResultado, eliminarResultado, buscarResultados } from "../controllers/controller.resultados.js"; 

const routeResultados = Router()

routeResultados.get('/listar', listarResultados)
routeResultados.post('/registrar', registrarResultados)
routeResultados.put('/actualizar/:id', actualizarResultado)
routeResultados.delete('/eliminar/:idResultado', eliminarResultado)
routeResultados.get('/buscar/:idResultado', buscarResultados)

export default routeResultados