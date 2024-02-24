import { Router } from "express";
import { listarVariables, CrearVariable, ActualizarVariable, desactivarVariable, buscarvariable } from "../controllers/controllerVariables.js";
import { check } from "express-validator";

const routeVariables = Router()

routeVariables.get("/listarvariable", listarVariables)

routeVariables.post("/crearvariable",
    [
        check('nombre', 'el nombre de la variable es requerido').not().isEmpty().isLength({max:200}),
        check('fk_tipo_analisis', 'la fk tipo analisis es requerida ').not().isEmpty().isNumeric(),
        check('estado', 'escribe un estado').not().isEmpty().isIn('activo', 'inactico')
    ],
 CrearVariable)

routeVariables.put("/actualizarvariable/:codigo", ActualizarVariable)
routeVariables.put("/desactivarVariable/:codigo", desactivarVariable)
routeVariables.get("/buscarvariable", buscarvariable)


export default routeVariables