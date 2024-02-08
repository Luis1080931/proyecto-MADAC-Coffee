import { Router } from "express";
import { desactivarUsuarios, editarUsuarios, registrarUsuarios } from "../controllers/usuarios.controller.js";

const routeUsuarios = Router()

routeUsuarios.post("/registrar", registrarUsuarios)

routeUsuarios.put("/actualizar/:identificacion", editarUsuarios)

routeUsuarios.put("/desactivar/:identificacion", desactivarUsuarios)



export default routeUsuarios

