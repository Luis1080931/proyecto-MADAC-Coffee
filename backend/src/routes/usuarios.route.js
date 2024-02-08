import { Router } from "express";
import { desactivarUsuarios, editarUsuarios, registrarUsuarios } from "../controllers/usuarios.controller.js";

const router = Router()

router.post("/usuarios", registrarUsuarios)

router.put("/usuarios/:identificacion", editarUsuarios)

router.post("/usuarios/:identificacion", desactivarUsuarios)



export default router

