import { pool } from "../database/conexion.js";
import query from 'express'

export const generarPDF = async (req, res) => {
    try {
        const {id} = req.params
        let sql = `
        SELECT 
            a.codigo AS analisis_id,
            c.nombre AS caficultor_nombre,
            f.codigo AS finca_id,
            mun.nombre AS municipio,
            f.vereda,
            f.nombre_finca,
            l.codigo AS lote_id,
            v.nombre AS variedad,
            m.codigo AS muestra_id,
            m.altura_MSNM,
            m.fecha AS fecha,
            m.proceso_fermentacion,
            m.humedad_cafe,
            m.tipo_secado,
            var.nombre AS variable,
            r.valor
        FROM 
            analisis a
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
        JOIN 
            usuarios c ON f.fk_caficultor = c.identificacion
        JOIN 
            resultados r ON a.codigo = r.fk_analisis
        JOIN 
            variables var ON fk_variables = var.v_codigo
        WHERE 
            a.codigo = ?;
    `
    const [result] = await pool.query(sql, [id])
    if(result.length>0){
        const consolidatedResult = reestructurarDatos(result);
        res.status(200).json(consolidatedResult);
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

function reestructurarDatos(datos) {
    if (datos.length === 0) return null;

    const resultadoFinal = {
        analisis_id: datos[0].analisis_id,
        caficultor_nombre: datos[0].caficultor_nombre,
        finca_id: datos[0].finca_id,
        municipio: datos[0].municipio,
        vereda: datos[0].vereda,
        nombre_finca: datos[0].nombre_finca,
        lote_id: datos[0].lote_id,
        variedad: datos[0].variedad,
        muestra_id: datos[0].muestra_id,
        altura_MSNM: datos[0].altura_MSNM,
        fecha: datos[0].fecha,
        proceso_fermentacion: datos[0].proceso_fermentacion,
        humedad_cafe: datos[0].humedad_cafe,
        tipo_secado: datos[0].tipo_secado,
        resultados: []
    };

    datos.forEach(row => {
        resultadoFinal.resultados.push({
            resultado_id: row.resultado_id,
            variable: row.variable,
            valor: row.valor
        });
    });

    return resultadoFinal;
}


export const listarDatos = async (req, res) => {
    try {
        let sql = `
            SELECT 
            a.codigo AS analisis_id,
            a.estado,
            m.codigo,
            m.fecha,
            cat.nombre AS catador,
            c.nombre AS caficultor_nombre,
            f.nombre_finca AS finca
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
                usuarios cat ON a.fk_analista = cat.identificacion
            `

            const [result] = await pool.query(sql   )
            if(result.length>0){
                res.status(200).json(result)
            }else{
                res.status(404).json({
                    status: 404,
                    message: 'No se encontraron resultados para la consulta'
                })
            }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
}