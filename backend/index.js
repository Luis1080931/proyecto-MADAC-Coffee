import express  from "express";
import body_parser from 'body-parser'
import lotes from './src/routes/lotes.routes.js'

const servidor = express()

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extend: false}))
servidor.set('views engine','ejs');
servidor.set('views','./views')

servidor.get("/document",(req,res)=>{
    res.render('document.ejs')
})
servidor.use(express.static('./public'))

servidor.use(lotes)


servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})