import { Router } from "express";
import { generarPDF } from "../controllers/reportes.controlle.js";

const routeReportes = Router()

routeReportes.get('/generar/:id', generarPDF)

export default routeReportes