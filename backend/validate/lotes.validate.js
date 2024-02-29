import { check } from "express-validator";


export const validarLotes=[
                            check('numero_arboles','no dijitaste ningun dato valido en el campo de numero de arboles').not().isEmpty().isNumeric(),
                            check('fk_finca','no dijitaste ningun dato valido en el campo de finca').not().isEmpty().isNumeric(),
                            check('fk_variedad','no dijitaste ningun dato valido en el campo de variedad').not().isEmpty().isNumeric(),
                            check('estado','no dijitaste ningun dato valido en el campo de estado').not().isEmpty().isNumeric()
]
