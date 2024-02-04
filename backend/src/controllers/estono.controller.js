import {pool} from '../database/conexion.js'

export const postUser=async(req,res)=>{
    const {identificacion,telefono,nombre,correo_electronico,tipo_usuario,estado}=req.body
    const [rows]=await pool.query("INSERT INTO usuarios (identificacion,telefono,nombre,correo_electronico,tipo_usuario,estado) VALUES (?,?,?,?,?,?)",[identificacion,telefono,nombre,correo_electronico,tipo_usuario,estado])
    res.send({
        identificacion,
        telefono,
        nombre,
        correo_electronico,
        tipo_usuario,
        estado,
    })
}