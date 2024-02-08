import { Router } from 'express'
import { desactivarAnalisis, editarAnalisis, registrarAnalisis } from '../controllers/analisis.controller.js'

const routeAnalisis = Router()

// localhost:3333/analisis/1
routeAnalisis.post("/registrar", registrarAnalisis)
routeAnalisis.put("/actualizar/:codigo", editarAnalisis)
routeAnalisis.put("/desactivar/:codigo", desactivarAnalisis)

export default routeAnalisis