import { check } from "express-validator";


export const validarFincas=[
check('dimension_mt2', 'no dijitaste ningun dato valido en el campo de dimension').not().isEmpty().isFloat(),
check('fk_caficultor','no dijitaste ningun dato valido en el campo de caficultor').not().isEmpty().isNumeric(),
check('municipio','no dijitaste ningun dato valido en el campo de municipio').not().isEmpty().isString(),
check('vereda','no dijitaste ningun dato valido en el campo de vereda').not().isEmpty().isString(),
check('estado','no dijitaste ningun dato valido en el campo de estado').not().isEmpty().isNumeric()
]
