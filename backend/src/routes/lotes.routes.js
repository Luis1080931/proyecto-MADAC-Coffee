import { Router } from "express";
import {getLotes,getLote,postLotes,desactivar_Lotes,actualizarLotes} from '..//controllers/lotes.controller.js'
import { check } from "express-validator";

const routerLotes = Router()
routerLotes.get("/listar",getLotes)
routerLotes.get("/buscar/:codigo",getLote)
routerLotes.post("/registrar",[check('numero_arboles','no dijitaste ningun dato valido en el campo de numero de arboles').not().isEmpty().isNumeric(),
                               check('fk_finca','no dijitaste ningun dato valido en el campo de finca').not().isEmpty().isNumeric(),
                               check('fk_variedad','no dijitaste ningun dato valido en el campo de variedad').not().isEmpty().isNumeric(),
                               check('estado','no dijitaste ningun dato valido en el campo de estado').not().isEmpty().isNumeric()
,],postLotes)
routerLotes.put("/desactivar/:codigo",desactivar_Lotes)
routerLotes.put('/actualizar/:codigo',[check('numero_arboles','no dijitaste ningun dato valido en el campo de numero de arboles').not().isEmpty().isNumeric(),
                                         check('fk_finca','no dijitaste ningun dato valido en el campo de finca').not().isEmpty().isNumeric(),
                                         check('fk_variedad','no dijitaste ningun dato valido en el campo de variedad').not().isEmpty().isNumeric()
,],actualizarLotes)
export default routerLotes;