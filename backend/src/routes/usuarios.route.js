import { Router } from "express";
import { desactivarUsuarios, editarUsuarios, registrarUsuarios, listarUsuarios, buscarUsuarios } from "./../controllers/usuarios.controller.js";

const routeUsuarios = Router()

routeUsuarios.get('/listar', listarUsuarios)
routeUsuarios.post("/registrar", registrarUsuarios)
routeUsuarios.put("/actualizar/:identificacion", editarUsuarios)
routeUsuarios.put("/desactivar/:identificacion", desactivarUsuarios)
routeUsuarios.get("/buscar/:identificacion",buscarUsuarios)


export default routeUsuarios

