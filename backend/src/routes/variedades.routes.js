import { Router } from 'express'
import { desactivarVariedades, editarVariedades, registrarVariedades} from '../controllers/variedades.controller.js'

const routeVariedades = Router()

// localhost:3333/variedades/#
routeVariedades.post("/registrar", registrarVariedades)
routeVariedades.put("/actualizar/:codigo", editarVariedades)
routeVariedades.put("/desactivar/:codigo", desactivarVariedades)

export default routeVariedades