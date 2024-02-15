import { Router } from 'express'
import { desactivarAnalisis, actualizarAnalisis, registrarAnalisis, listarAnalisis, buscarAnalisis } from '../controllers/analisis.controller.js'

const routeAnalisis = Router()

// localhost:3333/analisis/1
routeAnalisis.post("/registrar", registrarAnalisis)
routeAnalisis.put("/actualizar/:codigo", actualizarAnalisis)
routeAnalisis.post("/desactivar/:codigo", desactivarAnalisis)
routeAnalisis.get('/listar', listarAnalisis)
routeAnalisis.get('/buscar/:codigo', buscarAnalisis)

export default routeAnalisis