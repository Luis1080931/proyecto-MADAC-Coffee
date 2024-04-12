import express  from "express"
import body_parser from "body-parser"
import RouteMuestras from "./src/routes/routeMuestras.js";
import routeVariables from "./src/routes/routeVariables.js";
import cors from 'cors'

const servidor = express()
servidor.use(cors())

servidor.use(body_parser.json());
servidor.use(body_parser.urlencoded({ extend : false }));
//listen 
servidor.use('/muestras', RouteMuestras)
servidor.use('/variables', routeVariables)
servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})