import { pool } from "../database/conexion.js";
import query from 'express'

export const generarPDF = async (req, res) => {
    try {
        const {id} = req.params
        let sql = `
        SELECT 
            a.id AS analisis_id,
            c.identificacion AS caficultor_id,
            c.nombre AS caficultor_nombre,
            f.codigo AS finca_id,
            l.codigo AS lote_id,
            m.codigo AS muestra_id,
            m.fecha AS fecha,
            r.id AS resultado_id,
            r.variable,
            r.valor
        FROM 
            analisis a
        JOIN 
            muestras m ON a.muestra_id = m.id
        JOIN 
            lotes l ON m.lote_id = l.id
        JOIN 
            fincas f ON l.finca_id = f.id
        JOIN 
            caficultores c ON f.caficultor_id = c.id
        JOIN 
            resultados r ON a.id = r.analisis_id
        WHERE 
            a.id = ?;
    `
    const [result] = await pool.query(sql, [id])
    if(result.length>0){
        res.status(200).json(result)
    }else{
        res.status(404).json({
           'status': 404,
           'message': 'No se encontró el resultado'
        })
    }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor'+ error
        })
    }
}