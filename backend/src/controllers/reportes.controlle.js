import { pool } from "../database/conexion.js";
import query from 'express'

export const generarPDF = async (req, res) => {
    try {
        const {id} = req.params
        let sql = `
        SELECT 
            a.codigo AS analisis_id,
            c.identificacion AS caficultor_id,
            c.nombre AS caficultor_nombre,
            f.codigo AS finca_id,
            l.codigo AS lote_id,
            m.codigo AS muestra_id,
            m.fecha AS fecha,
            r.codigo AS resultado_id,
            r.fk_variables,
            r.valor
        FROM 
            analisis a
        JOIN 
            muestras m ON a.fk_muestra = m.codigo
        JOIN 
            lotes l ON m.fk_lote = l.codigo
        JOIN 
            fincas f ON l.fk_finca = f.codigo
        JOIN 
            usuarios c ON f.fk_caficultor = c.identificacion
        JOIN 
            resultados r ON a.codigo = r.fk_analisis
        WHERE 
            a.codigo = ?;
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