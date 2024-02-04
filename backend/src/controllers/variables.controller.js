import {pool} from '../database/conexion.js'

export const postVariedades=async(req,res)=>{
    const {nombre,estado}=req.body
    const [rows]=await pool.query('INSERT INTO variedades (nombre,estado) VALUES (?,?)',[nombre,estado]) 
    res.send({
        codigo:rows.insertId,
        nombre,
        estado,
    })
}