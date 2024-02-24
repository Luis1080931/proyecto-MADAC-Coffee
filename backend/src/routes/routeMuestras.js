import { Router } from "express";
import { listarMuestras, CrearMuestra, actualizarMuestra, desactivarMuestras, BuscarMuestra } from "../controllers/controllerMuestras.js";
import { check } from "express-validator";

const RouteMuestras = Router();

//localhost:3000/actualizarMuestra

RouteMuestras.get("/listarMuestra", listarMuestras);
//validation datos 
RouteMuestras.post("/crearMuestra",
    [
        check('fecha', 'fecha no esta registrada').not().isEmpty().isDate(),
        check('cantidad', 'cantidad no esta registrada').not().isEmpty().isDecimal(),
        check('quien_recibe', 'quien recibe no esta registrada').not().isEmpty().isLength({max:200}),
        check('proceso_fermentación', 'el proceso de fermentación no esta registrado').not().isEmpty().isLength({max:200}),
        check('humedad_cafe', 'la humedad del cafe no esta registrada').not().isEmpty().isDecimal(),
        check('altura_MSNM', 'la altura MSNM no esta registrada').not().isEmpty().isDecimal(),
        check('tipo_secado', 'tipo de secado  no esta registrado').not().isEmpty().isLength({max:200}),
        check('observaciones', 'observaciones  no esta registrado').not().isEmpty().isLength({max:200}),
        check('fk_lote', 'la fk lote no esta registrada ').not().isEmpty().isNumeric(),
        check('estado', 'escribe un estado').not().isEmpty().isIn('activo', 'inactico')
        
    ],
 CrearMuestra);

RouteMuestras.put("/actualizarMuestra/:codigo", actualizarMuestra);
RouteMuestras.put("/desactivarMuestra/:codigo", desactivarMuestras);
RouteMuestras.get("/buscarmuestra/:codigo", BuscarMuestra);

export default RouteMuestras;
