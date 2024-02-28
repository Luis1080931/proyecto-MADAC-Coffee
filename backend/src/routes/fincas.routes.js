import { Router } from "express";
import { getFincas, getFinca, postFincas, desactivar_Fincas, actualizarFincas } from '../controllers/fincas.controller.js';
import { check } from "express-validator";

const routerFincas = Router();

routerFincas.get("/listar", getFincas);
routerFincas.get("/buscar/:codigo", getFinca);

routerFincas.post("/registrar", [check('dimension_mt2', 'no dijitaste ningun dato valido en el campo de dimension').not().isEmpty().isFloat(),
                                check('fk_caficultor','no dijitaste ningun dato valido en el campo de caficultor').not().isEmpty().isNumeric(),
                                check('municipio','no dijitaste ningun dato valido en el campo de municipio').not().isEmpty().isString(),
                                check('vereda','no dijitaste ningun dato valido en el campo de vereda').not().isEmpty().isString(),
                                check('estado','no dijitaste ningun dato valido en el campo de estado').not().isEmpty().isNumeric()
    ,], postFincas);

    routerFincas.put("/desactivar/:codigo", desactivar_Fincas);
routerFincas.put("/actualizar/:codigo",[check('dimension_mt2', 'no dijitaste ningun dato valido en el campo de dimension').not().isEmpty().isFloat(),
                                          check('fk_caficultor','no dijitaste ningun dato valido en el campo de caficultor').not().isEmpty().isNumeric(),
                                          check('municipio','no dijitaste ningun dato valido en el campo de municipio').not().isEmpty().isString(),
                                          check('vereda','no dijitaste ningun dato valido en el campo de vereda').not().isEmpty().isString()
,], actualizarFincas);

export default routerFincas;
