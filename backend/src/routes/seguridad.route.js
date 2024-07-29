import { Router } from "express";
import { resetPassword, tokenPassword, validar } from "../controllers/seguridad.controller.js";

const rutaValidacion = Router()

rutaValidacion.post('/validacion', validar)
rutaValidacion.post('/recuperar', tokenPassword)
rutaValidacion.put('/cambiar', resetPassword)

export default rutaValidacion