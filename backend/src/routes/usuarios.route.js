import { Router } from "express";
import { desactivarUsuarios, actualizarUsuarios, registrarUsuarios, listarUsuarios, buscarUsuarios } from "./../controllers/usuarios.controller.js";
import { validarUsuarios } from "../../validate/usuarios.validate.js";
import { validarToken } from "../controllers/seguridad.controller.js";
 

const routeUsuarios = Router()

routeUsuarios.post("/registrar", validarToken, validarUsuarios, registrarUsuarios)

routeUsuarios.put("/actualizar/:identificacion", validarToken,validarUsuarios, actualizarUsuarios)

routeUsuarios.put("/desactivar/:identificacion", validarToken,desactivarUsuarios)

routeUsuarios.get("/listar", validarToken ,listarUsuarios)

routeUsuarios.get("/buscar/:identificacion",validarToken,buscarUsuarios)


export default routeUsuarios


