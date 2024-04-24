import { Router } from "express";
import { listarMuestras, CrearMuestra, actualizarMuestra, desactivarMuestras, BuscarMuestra, cambiarEstadoMuestra } from "../controllers/controllerMuestras.js";
import { validacionMuestra } from "../../validate/muestra.js";


const RouteMuestras = Router();

//localhost:3000/actualizarMuestra

RouteMuestras.get("/listar",listarMuestras);
//validation datos 
RouteMuestras.post("/crearmuestra", validacionMuestra,CrearMuestra);
RouteMuestras.put("/actualizar/:codigo",validacionMuestra,actualizarMuestra);
RouteMuestras.put("/desactivar/:codigo", desactivarMuestras);
RouteMuestras.get("/buscar/:codigo",BuscarMuestra);
RouteMuestras.get("/cambiarEstado/:codigo",cambiarEstadoMuestra);


export default RouteMuestras;
