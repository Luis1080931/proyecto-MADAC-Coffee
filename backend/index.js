import express  from "express";
import body_parser from 'body-parser'
import routeResultados from "./src/routes/route.resultados.js";
import routeAnalisis from "./src/routes/analisis.routes.js";
import routeFincas from "./src/routes/fincas.routes.js";
import routeLotes from "./src/routes/lotes.routes.js";
import routeVariedades from "./src/routes/variedades.routes.js";

const servidor = express()

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extend: false}))

servidor.use('/resultados', routeResultados)
servidor.use('/analisis', routeAnalisis)
servidor.use('/fincas', routeFincas)
servidor.use('/lotes', routeLotes)
servidor.use('/variedades', routeVariedades)


servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})