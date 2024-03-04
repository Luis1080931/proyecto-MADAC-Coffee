import { Router } from "express";
import { validar } from "../controllers/seguridad.controller.js";

const rutaValidacion = Router()

rutaValidacion.post('/validacion', validar)

export default rutaValidacion