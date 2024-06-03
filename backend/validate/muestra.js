import { check } from 'express-validator';

export const validacionMuestra = [
    check('fecha', 'La fecha es obligatoria y debe estar en formato YYYY-MM-DD').not().isEmpty().matches(/^\d{4}-\d{2}-\d{2}$/),
    check('tipo_molienda', 'El tipo de molienda es obligatorio y debe tener máximo 200 caracteres').not().isEmpty().isLength({ max: 200 }).matches(/^[a-zA-Z\s]+$/),
    check('densidad_cafe', 'La densidad del café es obligatoria y debe ser un número decimal').not().isEmpty().isDecimal(),
    check('proceso_fermentacion', 'El proceso de fermentación es obligatorio y debe tener máximo 200 caracteres').not().isEmpty().isLength({ max: 200 }).matches(/^[a-zA-Z\s]+$/),
    check('tipo_tostion', 'El tipo de tostión es obligatorio y debe tener máximo 200 caracteres').not().isEmpty().isLength({ max: 200 }).matches(/^[a-zA-Z\s]+$/),
    check('altura_MSNM', 'La altura MSNM es obligatoria y debe ser un número decimal').not().isEmpty().isDecimal(),
    check('tiempo_fermentacion', 'El tiempo de fermentación es obligatorio y debe ser un número decimal').not().isEmpty().isDecimal(),
    check('actividad_agua', 'La actividad del agua es obligatoria y debe ser un número decimal').not().isEmpty().isDecimal(),
    check('tiempo_secado', 'El tiempo de secado es obligatorio y debe ser un número decimal').not().isEmpty().isDecimal(),
    check('presentacion', 'La presentación es obligatoria y debe tener máximo 200 caracteres').not().isEmpty().isLength({ max: 200 }).matches(/^[a-zA-Z\s]+$/),
    check('fk_lote', 'El campo fk lote es obligatorio y debe contener solo números').not().isEmpty().isNumeric()
];
