import express from "express";
import bodyParser from 'body-parser';
import fincas from './src/routes/fincas.routes.js';
import lotes from './src/routes/lotes.routes.js'
import cors from 'cors';

const servidor = express();

servidor.use(bodyParser.json());
servidor.use(bodyParser.urlencoded({ extended: false }));

servidor.use(cors());

servidor.use("/fincas",fincas);
servidor.use("/lotes",lotes)

servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
