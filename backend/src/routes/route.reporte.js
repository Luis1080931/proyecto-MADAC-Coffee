import { Router } from "express";
import { generarPDF, listarDatos } from "../controllers/reportes.controlle.js";

const routeReportes = Router()

routeReportes.get('/generar/:id', generarPDF)
routeReportes.get('/listar', listarDatos)

export default routeReportes