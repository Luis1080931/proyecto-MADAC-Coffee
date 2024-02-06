import {pool} from "../database/conexion.js"


const getUsuarios= async (req,res)=>{
    try {
        const result = await pool.getConnection();
        const [rows] = await result.query("SELECT * FROM usuarios");

        const resultadoJSON = JSON.stringify(rows);
        
        res.send(resultadoJSON);
        
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
};
export default getUsuarios();


// const postUsuarios = async ()=>{

//     let id_usuario,telefono,nombre,correo_electronico,tipo_usuario,estado

//     id_usuario=143123;
//     telefono="+57 3125440153";
//     nombre="juan";
//     correo_electronico="juan@gmail.com";
//     tipo_usuario="caficultor";
//     estado="activo";

//     try {
//         const result = await pool.query("INSERT INTO usuarios (identificacion, telefono, nombre, correo_electronico, tipo_usuario, estado)"
//             + "VALUES (?,?,?,?,?,?) ", [id_usuario, telefono, nombre, correo_electronico, tipo_usuario, estado ]);

//         console.table(result);

//     } catch (error) {
//         console.error(error);
//     }
// }
// postUsuarios();


// // module.exports=getUsuarios
// // module.exports=postUsuarios






//index.js

import express  from "express";
import body_parser from 'body-parser'
import routeUsuarios from './src/routes/route.usuarios.js';


const servidor = express()

servidor.use(body_parser.json())
servidor.use(body_parser.urlencoded({extend: false}))

//rutas de usuario
servidor.use("/", routeUsuarios);

servidor.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})
