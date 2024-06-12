import { Router } from "express";
import { generarPDF, listarDatos, datosSensorialPdf } from "../controllers/reportes.controlle.js";

const routeReportes = Router()

routeReportes.get('/generar/:id', generarPDF)
routeReportes.get('/sensory/:id', datosSensorialPdf)
/* routeReportes.get('/productor/:id', datosProductor) */
routeReportes.get('/listar', listarDatos)

export default routeReportes