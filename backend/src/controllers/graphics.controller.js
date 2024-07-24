import { pool } from "../database/conexion.js";

export const tazaVariedad = async (req, res) => {
    try {
        let sql = `
            SELECT
                s.punteo_final,
                v.nombre
            FROM 
                sensoriales s
            JOIN 
                analisis a ON s.fk_analisis = a.codigo
            JOIN 
                muestras m ON a.fk_muestra = m.codigo
            JOIN 
                lotes l ON m.fk_lote = l.codigo
            JOIN 
                variedades v ON l.fk_variedad = v.codigo
            ORDER BY 
                s.punteo_final DESC
            LIMIT 3
        `
        const [result] = await pool.query(sql)
        if(result.length > 0){
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 404,
                message: 'No se encontraron resultados para la consulta'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor' + error
        })
    }
}

export const tazaMunicipio = async (req, res) => {
    try {
        let sql = `
            SELECT
                s.punteo_final,
                mun.nombre
            FROM 
                sensoriales s
            JOIN 
                analisis a ON s.fk_analisis = a.codigo
            JOIN 
                muestras m ON a.fk_muestra = m.codigo
            JOIN 
                lotes l ON m.fk_lote = l.codigo
            JOIN 
                variedades v ON l.fk_variedad = v.codigo
            JOIN 
                fincas f ON l.fk_finca = f.codigo
            JOIN 
                municipios mun ON f.municipio = mun.id_municipio
            ORDER BY 
                s.punteo_final DESC
            LIMIT 3
        `
        const [result] = await pool.query(sql)
        if(result.length > 0){
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 404,
                message: 'No se encontraron resultados para la consulta'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor' + error
        })
    }
}