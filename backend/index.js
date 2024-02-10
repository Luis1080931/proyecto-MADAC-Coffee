import express  from "express"
import body_parser from "body-parser"
import RouteMuestras from "./src/routes/routeMuestras.js";
import routeVariables from "./src/routes/routeVariables.js";

const servidor = express()

servidor.use(express.json());
servidor.use(express.urlencoded({ extended : false }));


servidor.use("/variables", routeVariables)
servidor.use("/muestras", RouteMuestras)

//ejs 
servidor.set('view engine', 'ejs')
servidor.set('views', './views');

servidor.get('/documents', (req,res)=>{
    res.render('documents.ejs');
})

//public styles css
servidor.use(express.static('./public'));

//listen 
servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
