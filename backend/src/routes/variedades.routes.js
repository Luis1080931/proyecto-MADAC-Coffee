import { Router } from 'express'
import { desactivarVariedades, actualizarVariedades, registrarVariedades, listarVariedades, buscarVariedades} from '../controllers/variedades.controller.js'

const routeVariedades = Router()

// localhost:3333/variedades/#
routeVariedades.post("/registrar", registrarVariedades)
routeVariedades.put("/actualizar/:codigo", actualizarVariedades)
routeVariedades.put("/desactivar/:codigo", desactivarVariedades)
routeVariedades.get('/listar', listarVariedades)
routeVariedades.get('/buscar/:codigo', buscarVariedades)

export default routeVariedades