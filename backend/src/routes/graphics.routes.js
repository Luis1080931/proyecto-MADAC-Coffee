import { Router } from "express";
import { tazaMunicipio, tazaVariedad } from "../controllers/graphics.controller.js";

const rutaGraphics = Router()

rutaGraphics.get('/taza', tazaVariedad)
rutaGraphics.get('/municipios', tazaMunicipio)

export default rutaGraphics