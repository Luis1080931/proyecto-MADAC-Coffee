import { Router } from "express";
import { listarMuestras, CrearMuestra, actualizarMuestra, desactivarMuestras, BuscarMuestra } from "../controllers/controllerMuestras.js";

const RouteMuestras = Router();

//localhost:3000/actualizarMuestra

RouteMuestras.get("/listarMuestra", listarMuestras);
RouteMuestras.post("/crearMuestra", CrearMuestra);

RouteMuestras.put("/actualizarMuestra/:codigo", actualizarMuestra);
RouteMuestras.put("/desactivarMuestra/:codigo", desactivarMuestras);
RouteMuestras.get("/buscarmuestra/:codigo", BuscarMuestra);

export default RouteMuestras;
