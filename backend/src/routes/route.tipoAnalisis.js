import { Router } from "express"
import { listar } from "../controllers/tipoAnalisis.controller.js"

const routeTipoAnalisis = Router()

routeTipoAnalisis.get("/listar", listar)

export default routeTipoAnalisis