import express  from "express";
import body_parser from 'body-parser'
import routeAnalisis from './src/routes/analisis.routes.js'
import routeFincas from './src/routes/fincas.routes.js'
import routeLotes from './src/routes/lotes.routes.js'
import routeResultados from './src/routes/route.resultados.js'
import routeMuestras from './src/routes/routeMuestras.js'
import routeVariables from './src/routes/routeVariables.js'
import routeUsuarios from './src/routes/usuarios.route.js'
import routeVariedades from './src/routes/variedades.routes.js'

const servidor = express()

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extend: false}))

servidor.use('/usuarios', routeUsuarios)
servidor.use('/fincas', routeFincas)
servidor.use('/lotes', routeLotes)
servidor.use('/variedades', routeVariedades)
servidor.use('/muestras', routeMuestras)
servidor.use('/analisis', routeAnalisis)
servidor.use('/variables', routeVariables)
servidor.use('/resultados', routeResultados)

//listen 
servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})