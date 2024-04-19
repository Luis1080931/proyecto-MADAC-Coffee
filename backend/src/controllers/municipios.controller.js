import { pool } from "../database/conexion.js";
import { query } from "express";

export const listar = async (req, res) => {

    try {
        let sql = 'SELECT * FROM municipios'

        const [result] = await pool.query(sql)
        if(result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({ status: 404, message: 'Not Found' })
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: 'Error del servidor' + error })
    }
    
}