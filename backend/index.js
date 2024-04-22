import express from "express";
import rutasVariable from './src/routes/routeVariables.js'
import rutasMuestras from './src/routes/routeMuestras.js'
import cors from "cors";

const servidor = express();

servidor.use(cors());

servidor.use(express.json());
servidor.use(express.urlencoded({ extended: false }));

servidor.use('/variable', rutasVariable)
servidor.use('/muestra', rutasMuestras)

//listen 
servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
