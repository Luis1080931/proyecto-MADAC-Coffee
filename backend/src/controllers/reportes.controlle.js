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
            m.tipo_molienda,
            m.densidad_cafe,
            m.tipo_tostion,
            m.tiempo_fermentacion,
            m.actividad_agua,
            m.tiempo_secado,
            m.presentacion,
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
            m.codigo = ?;
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
        tipo_molienda: datos[0].tipo_molienda,
        densidad_cafe: datos[0].densidad_cafe,
        tipo_tostion: datos[0].tipo_tostion,
        tiempo_fermentacion: datos[0].tiempo_fermentacion,
        actividad_agua: datos[0].actividad_agua,
        tiempo_secado: datos[0].tiempo_secado,
        presentacion: datos[0].presentacion,
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

            const [result] = await pool.query(sql)
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

export const datosSensorialPdf = async (req, res) => {
    try {
        const {id} = req.params
        let sql = `
            SELECT 
            s.*,
            m.codigo
            FROM 
                sensoriales s
            JOIN 
                analisis a ON s.fk_analisis = a.codigo
            JOIN 
                muestras m ON m.codigo = fk_muestra
            WHERE m.codigo = ?
            `

        const [result] = await pool.query(sql, [id])
        if(result.length>0){
            res.status(200).json(result[0])
        }else{
            res.status(404).json({
                message: 'No se resultados para el analisis sensorial'
            })
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor' , error
        })
    }
}

/* export const datosProductor = async (req, res) => {
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
            m.tipo_molienda,
            m.densidad_cafe,
            m.tipo_tostion,
            m.tiempo_fermentacion,
            m.actividad_agua,
            m.tiempo_secado,
            m.presentacion,
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
        tipo_molienda: datos[0].tipo_molienda,
        densidad_cafe: datos[0].densidad_cafe,
        tipo_tostion: datos[0].tipo_tostion,
        tiempo_fermentacion: datos[0].tiempo_fermentacion,
        actividad_agua: datos[0].actividad_agua,
        tiempo_secado: datos[0].tiempo_secado,
        presentacion: datos[0].presentacion,
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
 */
/* s.aroma,
            s.sabor, 
            s.postgusto,
            s.acidez,
            s.cuerpo, 
            s.uniformidad,
            s.balance,
            s.taza_limpia,
            s.dulzura,
            s.general,
            s.punteo,
            s.taza_defecto, 
            s.intensidad_defecto, 
            s.sub_defecto,
            s.punteo_final,
            s.notas 
            
            
        JOIN 
            sensoriales s ON a.codigo = s.fk_analisis
            */