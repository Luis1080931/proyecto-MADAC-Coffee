import { Router } from "express";
import { listarVariables, CrearVariable, ActualizarVariable, desactivarVariable } from "../controllers/controllerVariables.js";

const routeVariables = Router()

routeVariables.get("/listarvariable", listarVariables)
routeVariables.post("/crearvariable", CrearVariable)
routeVariables.put("/actualizarvariable", ActualizarVariable)
routeVariables.delete("/desactivarVariable", desactivarVariable)

export default routeVariables