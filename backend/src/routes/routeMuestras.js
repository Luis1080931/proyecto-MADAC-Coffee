import { Router } from "express";
import { listarMuestras, CrearMuestra, actualizarMuestra, desactivarMuestras, BuscarMuestra, activarMuestras, muestrasActivas, muestrasTable } from "../controllers/controllerMuestras.js";
import { validacionMuestra } from '../../validate/muestra.js'
import { validarToken } from "../controllers/seguridad.controller.js";


const RouteMuestras = Router();

//localhost:3000/actualizarMuestra

RouteMuestras.get("/listarMuestra", validarToken, listarMuestras);
//validation datos 
RouteMuestras.post("/crearMuestra",validarToken, CrearMuestra);

RouteMuestras.put("/actualizarMuestra/:codigo",validarToken, actualizarMuestra);
RouteMuestras.put("/desactivarMuestra/:codigo",validarToken, desactivarMuestras)
RouteMuestras.put("/activarMuestra/:codigo",validarToken, activarMuestras)
RouteMuestras.get("/buscarmuestra/:codigo",validarToken, BuscarMuestra);
RouteMuestras.get("/activas",validarToken, muestrasActivas);
RouteMuestras.get("/table",validarToken, muestrasTable);

export default RouteMuestras;
