import express  from "express";
import body_parser from 'body-parser'
import routeUsuarios from './src/routes/route.usuarios.js';


const servidor = express()

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extend: false}))

//rutas de usuario
servidor.use("/", routeUsuarios);

servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
