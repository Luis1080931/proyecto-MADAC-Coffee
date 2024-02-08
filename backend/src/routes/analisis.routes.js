import { Router } from 'express'
import { desactivarAnalisis, editarAnalisis, registrarAnalisis } from '../controllers/analisis.controller.js'

const router = Router()

// localhost:3333/analisis/1
router.post("/analisis", registrarAnalisis)
router.put("/analisis/:codigo", editarAnalisis)
router.post("/analisis/:codigo", desactivarAnalisis)

export default router