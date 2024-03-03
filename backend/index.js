import express  from "express";
import body_parser from 'body-parser'
import rutas from './src/routes/usuarios.route.js'
import rutaValidacion from "./src/routes/seguridad.route.js";


const servidor = express()



servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extend: false}))


servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
