import express  from "express"

import RouteMuestras from "./src/routes/routeMuestras.js";
import routeVariables from "./src/routes/routeVariables.js";




const servidor = express()

servidor.use(express.json());
servidor.use(express.urlencoded({ extended : false }));
servidor.use('/muestras', RouteMuestras)
servidor.use('/variables', routeVariables)

//listen 
servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
