import { Router } from "express";
import { listar } from "../controllers/municipios.controller.js";

const RutaMunicipios = Router()

RutaMunicipios.get('/listar', listar)

export default RutaMunicipios