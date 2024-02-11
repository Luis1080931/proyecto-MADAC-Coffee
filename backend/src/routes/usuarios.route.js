import { Router } from "express";
import { desactivarUsuarios, editarUsuarios, registrarUsuarios, listarUsuarios, buscarUsuarios } from "../controller/usuarios.controller.js";

const router = Router()

router.post("/registrar", registrarUsuarios)

router.put("/actualizar/:identificacion", editarUsuarios)

router.put("/desactivar/:identificacion", desactivarUsuarios)

router.post("/listar", listarUsuarios)

router.post("/buscar/:identificacion",buscarUsuarios)


export default router

