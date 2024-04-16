import express from 'express';
import body_parser from 'body-parser';
import cors from 'cors';
import routeResultados from './src/routes/route.resultados.js';

const servidor = express();

servidor.use(cors());

servidor.use(body_parser.json());
servidor.use(body_parser.urlencoded({ extend: false }));

servidor.use('/resultados', routeResultados);

servidor.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
