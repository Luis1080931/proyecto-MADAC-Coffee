import { Router } from 'express'
import { desactivarAnalisis, actualizarAnalisis, registrarAnalisis, listarAnalisis, buscarAnalisis, listarUsuarios, listarMuestras } from '../controllers/analisis.controller.js'
import { validarAnalisis } from '../../validate/analisis.validate.js'
// import { validarToken } from '../controllers/seguridad.controller.js'

const routeAnalisis = Router()

// localhost:3333/analisis/1
routeAnalisis.post("/registrar", registrarAnalisis)
routeAnalisis.put("/actualizar/:codigo", actualizarAnalisis)
routeAnalisis.put("/desactivar/:codigo", desactivarAnalisis)
routeAnalisis.get('/listar', listarAnalisis)
routeAnalisis.get('/buscar/:codigo', buscarAnalisis)
routeAnalisis.get('/listarUsuario', listarUsuarios)
routeAnalisis.get('/listarMuestras', listarMuestras)

export default routeAnalisis