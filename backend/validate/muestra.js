import { check } from 'express-validator';

export const validacionMuestra = [
    check('fecha', 'La fecha es obligatoria y debe estar en formato YYYY-MM-DD').not().isEmpty().matches(/^\d{4}-\d{2}-\d{2}$/),
    check('tipo_molienda', 'El tipo de molienda es obligatorio y debe tener máximo 200 caracteres').not().isEmpty().isLength({ max: 200 }).matches(/^[a-zA-Z0-9\s]+$/),
    check('densidad_cafe', 'La densidad del café es obligatoria y debe tener máximo 200 caracteres').not().isEmpty().isLength({ max: 200 }).matches(/^[a-zA-Z0-9\s%]+$/),
    check('proceso_fermentacion', 'El proceso de fermentación es obligatorio y debe tener máximo 200 caracteres').not().isEmpty().isLength({ max: 200 }).matches(/^[a-zA-Z0-9\s]+$/),
    check('tipo_tostion', 'El tipo de tostión es obligatorio y debe tener máximo 200 caracteres').not().isEmpty().isLength({ max: 200 }).matches(/^[a-zA-Z0-9\s]+$/),
    check('altura_MSNM', 'La altura MSNM es obligatoria y debe tener un valor decimal ').not().isEmpty().isNumeric(),
    check('tiempo_fermentacion', 'El tiempo de fermentación es obligatorio y debe tener máximo 200 caracteres').not().isEmpty().isLength({ max: 200 }).matches(/^[a-zA-Z0-9\s]+$/),
    check('actividad_agua', 'La actividad del agua es obligatoria y debe tener máximo 200 caracteres').not().isEmpty().isLength({ max: 200 }).matches(/^[a-zA-Z0-9\s]+$/),
    check('tiempo_secado', 'El tiempo de secado es obligatorio y debe tener máximo 200 caracteres').not().isEmpty().isLength({ max: 200 }).matches(/^[a-zA-Z0-9\s]+$/),
    check('presentacion', 'La presentación es obligatoria y debe tener máximo 200 caracteres').not().isEmpty().isLength({ max: 200 }).matches(/^[a-zA-Z0-9\s]+$/),
    check('fk_lote', 'El campo fk lote es obligatorio y debe contener solo números enteros y existentes').not().isEmpty().isNumeric()
];
