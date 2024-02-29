import { Router } from 'express'
import { desactivarAnalisis, actualizarAnalisis, registrarAnalisis, listarAnalisis, buscarAnalisis } from '../controllers/analisis.controller.js'
import { validarAnalisis } from '../../validate/analisis.validate.js'

const routeAnalisis = Router()

// localhost:3333/analisis/1
routeAnalisis.post("/registrar", validarAnalisis, registrarAnalisis)
routeAnalisis.put("/actualizar/:codigo",validarAnalisis, actualizarAnalisis)
routeAnalisis.put("/desactivar/:codigo", desactivarAnalisis)
routeAnalisis.get('/listar', listarAnalisis)
routeAnalisis.get('/buscar/:codigo', buscarAnalisis)

export default routeAnalisis