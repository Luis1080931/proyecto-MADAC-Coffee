import express  from "express"
import body_parser from "body-parser"
import RouteMuestras from "./src/routes/routeMuestras.js";
import routeVariables from "./src/routes/routeVariables.js";

const servidor = express()

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extends: false}))
servidor.use("/variables", routeVariables)
servidor.use("/muestras", RouteMuestras)

servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
