import { check } from 'express-validator';

export const validacionMuestra = [
  check('fecha', 'fecha no esta registrada').not().isEmpty().isDate(),
  check('cantidad', 'cantidad no esta registrada').not().isEmpty().isDecimal(),
  check('quien_recibe', 'quien recibe no esta registrada').not().isEmpty().isLength({max:200}).matches(/^[a-zA-Z\s]+$/),
  check('proceso_fermentación', 'el proceso de fermentación no esta registrado').not().isEmpty().isLength({max:200}).matches(/^[a-zA-Z\s]+$/),
  check('humedad_cafe', 'la humedad del cafe no esta registrada').not().isEmpty().isDecimal(),
  check('altura_MSNM', 'la altura MSNM no esta registrada').not().isEmpty().isDecimal(),
  check('tipo_secado', 'tipo de secado no esta registrado').not().isEmpty().isLength({max:200}).matches(/^[a-zA-Z\s]+$/),
  check('observaciones', 'observaciones no esta registrado').not().isEmpty().isLength({max:200}).matches(/^[a-zA-Z\s]+$/),
  check('fk_lote', 'la fk lote no esta registrada').not().isEmpty().isNumeric(),
  check('estado', 'escribe un estado').not().isEmpty().isIn('activo', 'inactico')
];

/* 

export const validacionMuestraActualizar =     [
    check('fecha', 'fecha no esta registrada').not().optional().isEmpty().isDate(),
    check('cantidad', 'cantidad no esta registrada').not().isEmpty().optional().isDecimal(),
    check('quien_recibe', 'quien recibe no esta registrada').not().isEmpty().optional().isLength({max:200}).matches(/^[a-zA-Z\s]+$/),
    check('proceso_fermentación', 'el proceso de fermentación no esta registrado').not().isEmpty().optional().isLength({max:200}).matches(/^[a-zA-Z\s]+$/),
    check('humedad_cafe', 'la humedad del cafe no esta registrada').not().isEmpty().optional().isDecimal(),
    check('altura_MSNM', 'la altura MSNM no esta registrada').not().isEmpty().optional().isDecimal(),
    check('tipo_secado', 'tipo de secado  no esta registrado').not().isEmpty().optional().isLength({max:200}).matches(/^[a-zA-Z\s]+$/),
    check('observaciones', 'observaciones  no esta registrado').not().isEmpty().optional().isLength({max:200}).matches(/^[a-zA-Z\s]+$/),
    check('fk_lote', 'la fk lote no esta registrada ').not().isEmpty().optional().isNumeric(),
    check('estado', 'escribe un estado').not().isEmpty().optional().isIn('activo', 'inactico')
    
] */