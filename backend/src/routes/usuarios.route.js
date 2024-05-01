import { Router } from "express";
import { desactivarUsuarios, actualizarUsuarios, registrarUsuarios, listarUsuarios, buscarUsuarios, activarUsuarios } from "./../controllers/usuarios.controller.js";
import { validarUsuarios } from "../../validate/usuarios.validate.js";
import { validarToken } from "../controllers/seguridad.controller.js";
 

const routeUsuarios = Router()

routeUsuarios.post("/registrar",  registrarUsuarios)

routeUsuarios.put("/actualizar/:identificacion", actualizarUsuarios)

routeUsuarios.put("/desactivar/:identificacion",desactivarUsuarios)
routeUsuarios.put("/activar/:identificacion",activarUsuarios)

routeUsuarios.get("/listar" ,listarUsuarios)

routeUsuarios.get("/buscar/:identificacion",validarToken,buscarUsuarios)


export default routeUsuarios


