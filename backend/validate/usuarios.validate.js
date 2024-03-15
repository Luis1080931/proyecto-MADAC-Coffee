import { check } from "express-validator";

export const validarUsuarios=[
    check('identificacion', 'El campo no puede estar vacio y tiene que ser numerico')
        
        .not().isEmpty().isNumeric(),

    check('telefono', 'Ingrese un telefono valido válido')
        .not().isEmpty()
        .isNumeric(),

    check('nombre', 'El campo no puede estar vacio y no puede ser mas grande de 20 caracteres')
        .not().isEmpty().isLength({ max: 20 }),

    check('correo_electronico', 'Ingrese un correo valido')
        .not().isEmpty().isEmail(),

    check('tipo_usuario', 'El campo no puede estar vacio ')
        .not().isEmpty(),
    
    check('password')
    .not() .isEmpty() .isLength( { min: 7 }),

]