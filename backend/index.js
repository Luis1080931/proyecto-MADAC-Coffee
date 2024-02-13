import express  from "express"
import body_parser from "body-parser"


const servidor = express()

servidor.use(express.json());
servidor.use(express.urlencoded({ extended : false }));


//listen 
servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
