import {pool} from "../database/conexion.js"


const getUsuarios= async (req,res)=>{
    try {
        const result = await pool.getConnection();
        const [rows] = await result.query("SELECT * FROM usuarios");

        res.json(rows);
        // console.table(result);
        
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};
export default getUsuarios();


// const postUsuarios = async ()=>{

//     let id_usuario,telefono,nombre,correo_electronico,tipo_usuario,estado

//     id_usuario=123123;
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