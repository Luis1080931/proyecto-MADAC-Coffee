import { Router } from "express";
import { listarVariables, CrearVariable, ActualizarVariable, desactivarVariable, buscarvariable } from "../controllers/controllerVariables.js";
<<<<<<< HEAD
import { validacionVariable } from "../../validate/variable.js";
=======
import { validacionVariable } from "../validate/variable.js";
import { validarToken } from "../controllers/seguridad.controller.js";
>>>>>>> a94e0472c33e01f00941344681f9cbb4448a8cfe

const routeVariables = Router()

routeVariables.get("/listarvariable",validarToken, listarVariables)

routeVariables.post("/crearvariable",validarToken, validacionVariable,CrearVariable)

routeVariables.put("/actualizarvariable/:codigo",validarToken,validacionVariable,ActualizarVariable)
routeVariables.put("/desactivarVariable/:codigo",validarToken, desactivarVariable)
routeVariables.get("/buscarvariable/:id",validarToken, buscarvariable)


export default routeVariables