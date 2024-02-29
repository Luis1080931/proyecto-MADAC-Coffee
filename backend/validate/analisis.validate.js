import { check } from "express-validator";

export const validarAnalisis = 
[
    check('fecha', 'Este campo no puede estar vacio')
        .not().isEmpty(),

    check('fk_analista', 'Ingrese un código válido')
        .not().isEmpty()
        .isNumeric(),

    check('fk_muestra', 'Ingrese un código válido')
        .not().isEmpty()
        .isNumeric(),

    check('fk_tipo_analisis', 'Ingrese un código válido')
        .not().isEmpty()
        .isNumeric(),

    check('estado', 'Seleccione un estado')
    .not().isEmpty()
]