import express  from "express";
import body_parser from 'body-parser'
import rutas from './src/routes/usuarios.route.js'
import rutaValidacion from "./src/routes/seguridad.route.js";
import cors from 'cors'
import routeUsuarios from "./src/routes/usuarios.route.js";


const servidor = express()
servidor.use(cors())


servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extend: false}))

servidor.use('/usuarios', routeUsuarios)
servidor.use(rutaValidacion)


servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
