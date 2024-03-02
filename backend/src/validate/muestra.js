import { check } from 'express-validator';

export const validacionMuestra = [
  check('fecha').not().isEmpty().withMessage('fecha no esta registrada').isDate(),
  check('cantidad').not().isEmpty().withMessage('cantidad no esta registrada').isDecimal(),
  check('quien_recibe').not().isEmpty().withMessage('quien recibe no esta registrada').isLength({max:200}).matches(/^[a-zA-Z\s]+$/),
  check('proceso_fermentacion').not().isEmpty().withMessage('el proceso de fermentación no esta registrado').isLength({max:200}).matches(/^[a-zA-Z\s]+$/),
  check('humedad_cafe').not().isEmpty().withMessage('la humedad del cafe no esta registrada').isDecimal(),
  check('altura_MSNM').not().isEmpty().withMessage('la altura MSNM no esta registrada').isDecimal(),
  check('tipo_secado').not().isEmpty().withMessage('tipo de secado no esta registrado').isLength({max:200}).matches(/^[a-zA-Z\s]+$/),
  check('observaciones').not().isEmpty().withMessage('observaciones no esta registrado').isLength({max:200}).matches(/^[a-zA-Z\s]+$/),
  check('fk_lote').not().isEmpty().withMessage('la fk lote no esta registrada').isNumeric(),
  check('estado').not().isEmpty().withMessage('escribe un estado').isIn(['activo', 'inactivo'])
 ];

