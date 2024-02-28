import express  from "express";
import body_parser from 'body-parser'
import lotes from './src/routes/lotes.routes.js'
import fincas from './src/routes/fincas.routes.js'

const servidor = express()

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extend: false}))
servidor.use("/lotes",lotes)
servidor.use("/fincas",fincas)

servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})