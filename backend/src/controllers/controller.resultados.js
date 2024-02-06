import { query } from "express" 
import { pool } from "../database/conexion.js" 

export const listarResultados = async (req, res) => {

    try {
        
        let sql = `SELECT fecha, fk_analisis AS analisis, nombre AS variable, observaciones, valor FROM resultados JOIN variables ON fk_variables = v_codigo`

        const [result] = await pool.query(sql)

        if(result.length>0){
            res.status(200).json(result)
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error en listar los resultados' + error
        })
    }
}

export const registrarResultados = async (req, res) => {

    try {
        
        const{fecha, fk_analisis, fk_variables, valor, observaciones} = req.body

        if(fecha == undefined || fk_analisis == undefined ||  fk_variables == undefined || valor == undefined ){
            res.status(400).json({ message: 'Por favor llenar todos los campos' })
        }
        
        let sql = `INSERT INTO resultados (fecha, fk_analisis, fk_variables, observaciones, valor) values (?, ?, ?, ?, ?)`

        const[rows] = await pool.query(sql, [fecha, fk_analisis, fk_variables, observaciones, valor])

        if(rows.affectedRows>0){
            res.status(200).json({
                'status': 200,
                'message': 'Se realizo el registro con exito'
            })
        } else {
            res.status(400).json({
                'status': 400,
                'message': 'No se registro el resultado'
            })
        }

    } catch (error) {
        res.status(500).json({
            'status': 500,
            'message': 'Error de servidor' + error
        })
    }
}

export const actualizarResultado = async (req, res) => {

    try {
        
        const{fecha, fk_analisis, fk_variable, observaciones, valor} = req.body
        let idResultado = req.params.idResultado

        let sql = `UPDATE resultados set fecha = ?, fk_analisis = ?, fk_variables = ?, observaciones = ?, valor = ? WHERE codigo = ?`

        const[rows] = await pool.query(sql, [fecha, fk_analisis, fk_variable, observaciones, valor, idResultado])

        if(rows.affectedRows>0){
            res.status(200).json({
                'status': 200,
                'message': 'Se actualizo con exito el resultado'
            })
        } else {
            res.status(400).json({
                'status': 400,
                'message': 'No fue posible actualizar el resultado'
            })
        }

    } catch (error) {  
        res.status(500).json({
            'status': 500,
            'message': 'Error del servidor' + error
        })
    }
}

export const eliminarResultado = async (req, res) => {

    try {
        
        let idResultado = req.params.idResultado
        let sql = `DELETE FROM resultados WHERE codigo = ?`

        const[rows] = await pool.query(sql, [idResultado])

        if(rows.affectedRows>0){
            res.status(200).json({
                'status': 200,
                'message': 'Se elimino con exito el resultado'
            })
        }else {
            res.status(400).json({
                'status': 400,
                'message': 'Error  al intentar eliminar el resultado'
            })
        }

    } catch (error) {
        res.status(500).json({
            'status': 500,
            'message': 'Error de servidor' + error
        })
    }
}

export const buscarResultados = async (req, res) => {

    try {
        
        let idResultado = req.params.idResultado
        let sql = `SELECT fecha, fk_analisis AS analisis, fk_variables AS variable, observaciones, valor FROM resultados JOIN variables ON fk_variables = codigo`

        const[result] = await pool.query(sql, [idResultado])
        res.status(200).json(result)
        

    } catch (error) {
        res.status(500).json({
            message: 'Error en la consulta' + error
        })
    }
}