import { Router } from 'express'
import { desactivarVariedades, editarVariedades, registrarVariedades} from '../controllers/variedades.controller.js'

const router = Router()

// localhost:3333/variedades/#
router.post("/variedades", registrarVariedades)
router.put("/variedades/:codigo", editarVariedades)
router.post("/variedades/:codigo", desactivarVariedades)

export default router