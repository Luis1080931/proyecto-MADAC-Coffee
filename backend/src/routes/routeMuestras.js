import { Router } from "express";
import { listarMuestras, CrearMuestra, actualizarMuestra, desactivarMuestras } from "../controllers/controllerMuestras.js";

const RouteMuestras = Router();

//localhost:3000/actualizarMuestra

RouteMuestras.get("/listarMuestra", listarMuestras);
RouteMuestras.post("/crearMuestra", CrearMuestra);
RouteMuestras.put("/actualizarMuestra/:codigo", actualizarMuestra);

// Cambiar la solicitud PUT a DELETE para desactivarMuestras
RouteMuestras.put("/desactivarMuestra/:codigo", desactivarMuestras);

export default RouteMuestras;
