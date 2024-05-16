import { Router } from "express";
import { generarPDF } from "../controllers/reportes.controlle.js";

const routeReportes = Router()

routeReportes.get('/generar', generarPDF)

export default routeReportes