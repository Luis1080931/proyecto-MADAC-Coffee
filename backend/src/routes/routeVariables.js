import { Router } from "express";
import { listarVariables, CrearVariable, ActualizarVariable, desactivarVariable, buscarvariable, activarVariable, variablesActivas } from "../controllers/controllerVariables.js";
import { validacionVariable } from "../../validate/variable.js";
import { validarToken } from "../controllers/seguridad.controller.js";

const routeVariables = Router()

routeVariables.get("/listarvariable", validarToken, listarVariables)

routeVariables.post("/crearvariable",/* validarToken, */ /* validacionVariable, */CrearVariable)

routeVariables.put("/actualizarvariable/:codigo",validarToken, ActualizarVariable)
routeVariables.put("/desactivarVariable/:codigo",validarToken, desactivarVariable)
routeVariables.put("/activarVariable/:codigo",validarToken, activarVariable)
routeVariables.get("/buscarvariable/:codigo",validarToken, buscarvariable)
routeVariables.get("/activas",validarToken, variablesActivas)


export default routeVariables