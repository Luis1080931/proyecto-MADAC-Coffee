import { check } from "express-validator";

export const validarVariedades = 
[
 
    check('nombre', 'Este campo no puede estar vacío, maximo 50 caracteres')
        .not().isEmpty()
        .isLength({ max: 50 }),


    check('estado', 'Seleccione un estado')
    .not().isEmpty()
]