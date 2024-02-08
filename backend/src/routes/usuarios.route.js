import { Router } from "express";
import { desactivarUsuarios, editarUsuarios, registrarUsuarios } from "../controllers/usuarios.controller.js";

const router = Router()

router.post("/registrar", registrarUsuarios)

router.put("/actualizar/:identificacion", editarUsuarios)

router.post("/desactivar/:identificacion", desactivarUsuarios)



export default router

