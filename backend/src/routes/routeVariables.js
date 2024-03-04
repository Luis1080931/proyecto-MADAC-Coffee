import { Router } from "express";
import { listarVariables, CrearVariable, ActualizarVariable, desactivarVariable, buscarvariable } from "../controllers/controllerVariables.js";
import { validacionVariable } from "../../validate/variable.js";
import { validarToken } from "../controllers/seguridad.controller.js";

const routeVariables = Router()

routeVariables.get("/listarvariable",validarToken, listarVariables)

routeVariables.post("/crearvariable",validarToken, validacionVariable,CrearVariable)

routeVariables.put("/actualizarvariable/:codigo",validarToken, ActualizarVariable)
routeVariables.put("/desactivarVariable/:codigo",validarToken, desactivarVariable)
routeVariables.get("/buscarvariable/:id",validarToken, buscarvariable)


export default routeVariables