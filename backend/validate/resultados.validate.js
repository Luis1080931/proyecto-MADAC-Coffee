import { check } from "express-validator";

export const validarResultados = 
[
    check('fecha', 'El campo no puede estar vacio')
        /* .matches(/^\d{4}-\d{2}-d{2}$/) */
        .not().isEmpty(),

    check('fk_analisis', 'Ingrese un código válido')
        .not().isEmpty()
        .isNumeric(),

    check('fk_variables', 'Ingrese un código válido')
        .not().isEmpty()
        .isNumeric(),

    check('valor', 'El campo no puede estar vacío y con maximo 50 caracteres')
        .not().isEmpty()
        .isLength({ max: 50 }),

    check('observaciones', 'El campo no puede estar y con maximo 500 caracteres')
        .not().isEmpty()
        .isLength({ max: 500}),

    check('estado', 'Seleccione un estado')
    .not().isEmpty()
]