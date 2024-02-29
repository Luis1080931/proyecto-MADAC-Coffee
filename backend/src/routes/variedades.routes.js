import { Router } from 'express'
import { desactivarVariedades, actualizarVariedades, registrarVariedades, listarVariedades, buscarVariedades} from '../controllers/variedades.controller.js'
import { validarVariedades } from '../../validate/variedades.validate.js'

const routeVariedades = Router()

// localhost:3333/variedades/#
routeVariedades.post("/registrar",validarVariedades, registrarVariedades)
routeVariedades.put("/actualizar/:codigo",validarVariedades, actualizarVariedades)
routeVariedades.put("/desactivar/:codigo", desactivarVariedades)
routeVariedades.get('/listar', listarVariedades)
routeVariedades.get('/buscar/:codigo', buscarVariedades)

export default routeVariedades