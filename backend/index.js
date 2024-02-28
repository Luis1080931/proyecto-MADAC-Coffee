import express  from "express";
import body_parser from 'body-parser'
import fincas from './src/routes/fincas.routes.js'
import lotes from './src/routes/lotes.routes.js'

const servidor = express()

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extend: false}))
servidor.use("/fincas",fincas)
servidor.use("/lotes",lotes)
servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})