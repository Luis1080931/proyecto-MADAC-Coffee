import { Router } from "express";
import { listarVariables, CrearVariable, ActualizarVariable, desactivarVariable, buscarvariable } from "../controllers/controllerVariables.js";
import { validacionVariable } from '../../validate/variable.js'
/* import { validarToken } from "../controllers/seguridad.controller.js"; */

const routeVariables = Router()

routeVariables.get("/listar",/* validarToken, */ listarVariables)

routeVariables.post("/crear",/* validarToken, */ validacionVariable,CrearVariable)

routeVariables.put("/actualizar/:codigo",/* validarToken, */validacionVariable,ActualizarVariable)
routeVariables.put("/desactivar/:codigo",/* validarToken, */ desactivarVariable)
routeVariables.get("/buscarvariable/:id",/* validarToken, */ buscarvariable)


export default routeVariables