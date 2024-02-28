import { check } from "express-validator";

export const validarResultados = 
[
    check('fecha')
        .matches(/^\d{4}-\d{2}-d{2}$/).withMessage('El formato de fecha ser Año-Mes-Dia')
        .notEmpty().withMessage('El campo no puede estar vacío'),

    check('fk_analisis')
        .isNumeric().withMessage('Ingrese un código válido')
        .notEmpty('El campo no puede estar vacío'),

    check('fk_variables')
        .isNumeric().withMessage('Ingrese un código válido')
        .notEmpty().withMessage('El campo no puede estar vacío'),

    check(valor)
        .not().isEmpty().withMessage('El campo no puede estar vacío')
        .isLength({ max: 50 }).withMessage('No se acepan más de 50 caracteres'),

    check(observaciones)
        .not().isEmpty().withMessage('El campo no puede estar vacio')
        .isLength({ max: 500}).withMessage('No se aceptan más de 50 caracteres')
]