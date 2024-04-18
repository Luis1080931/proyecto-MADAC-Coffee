import { check } from 'express-validator';

export const validacionMuestra = [
    check('fecha', 'La fecha es obligatoria y debe estar en formato YYYY-MM-DD').not().isEmpty().matches(/^\d{4}-\d{2}-\d{2}$/),
    check('cantidad', 'La cantidad es obligatoria y debe ser un número decimal').not().isEmpty().isDecimal(),
    check('quien_recibe', 'El campo quien recibe es obligatorio, debe tener máximo 200 caracteres, y solo puede contener letras y espacios').not().isEmpty().isLength({max:200}).matches(/^[a-zA-Z\s]+$/),
    check('proceso_fermentacion', 'El proceso de fermentación es obligatorio, debe tener máximo 200 caracteres, y solo puede contener letras y espacios').not().isEmpty().isLength({max:200}),
    check('humedad_cafe', 'La humedad del café es obligatoria y debe ser un número decimal').not().isEmpty().isDecimal(),
    check('altura_MSNM', 'La altura MSNM es obligatoria y debe ser un número decimal').not().isEmpty().isDecimal(),
    check('tipo_secado', 'El tipo de secado es obligatorio, debe tener máximo 200 caracteres, y solo puede contener letras y espacios').not().isEmpty().isLength({max:200}).matches(/^[a-zA-Z\s]+$/),
    check('observaciones', 'Las observaciones son obligatorias, deben tener máximo 200 caracteres, y solo pueden contener letras y espacios').not().isEmpty().isLength({max:200}).matches(/^[a-zA-Z\s]+$/),
    check('fk_lote', 'El campo fk lote es obligatorio y debe contener solo números').not().isEmpty().isNumeric(), 
];
