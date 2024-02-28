import { Router } from "express";
import { listarMuestras, CrearMuestra, actualizarMuestra, desactivarMuestras, BuscarMuestra } from "../controllers/controllerMuestras.js";
import { validacionMuestra } from '../../validate/muestra.js'


const RouteMuestras = Router();

//localhost:3000/actualizarMuestra

RouteMuestras.get("/listarMuestra", listarMuestras);
//validation datos 
RouteMuestras.post("/crearMuestra",validacionMuestra,CrearMuestra);

RouteMuestras.put("/actualizarMuestra/:codigo", actualizarMuestra);
RouteMuestras.put("/desactivarMuestra/:codigo", desactivarMuestras);
RouteMuestras.get("/buscarmuestra/:codigo", BuscarMuestra);

export default RouteMuestras;
