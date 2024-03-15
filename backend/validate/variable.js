import { check } from "express-validator";

export const validacionVariable  =  [
    check('nombre', 'el nombre de la variable es requerido').not().isEmpty().isLength({max:200}),
    check('fk_tipo_analisis', 'la fk tipo analisis es requerida ').not().isEmpty().isNumeric(),
    check('estado', 'escribe un estado').not().isEmpty()/* .isIn('activo', 'inactico') */
]