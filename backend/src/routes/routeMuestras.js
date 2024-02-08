import { Router } from "express";
import { listarMuestras, CrearMuestra, actualizarMuestra, desactivarMuestras } from "../controllers/controllerMuestras.js";

const RouteMuestras = Router();

RouteMuestras.get("/listarMuestra", listarMuestras);
RouteMuestras.post("/crearMuestra", CrearMuestra);
RouteMuestras.put("/actualizarMuestra/:codigo", actualizarMuestra);

// Cambiar la solicitud PUT a DELETE para desactivarMuestras
RouteMuestras.delete("/desactivarMuestra", desactivarMuestras);

export default RouteMuestras;
