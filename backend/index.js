import express  from "express";
import body_parser from 'body-parser'
import routeAnalisis from './src/routes/analisis.routes.js'
import routeVariedades from './src/routes/variedades.routes.js'


import cors from 'cors'



const servidor = express()

servidor.use(cors())

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extend: false}))


servidor.use('/variedades', routeVariedades)

servidor.use('/analisis', routeAnalisis)


servidor.set('view engine', 'ejs')

servidor.set('views', './views')

servidor.use(express.static('./public'))

servidor.get('/document', (req, res) => {
    res.render('document.ejs')
})

//listen 
servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

