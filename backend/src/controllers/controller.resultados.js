import { query } from "express" 
import { pool } from "../database/conexion.js" 
import { validationResult } from "express-validator"

export const listarResultados = async (req, res) => {

    try {
        
        let sql = `SELECT codigo, fecha, fk_analisis AS analisis, nombre AS variable, observaciones, valor, r.estado FROM resultados AS r JOIN variables ON fk_variables = v_codigo`

        const [result] = await pool.query(sql)

        if(result.length>0){
            res.status(200).json(result)
        }else{
            res.status(404).json({
                'status': 404,
                'message': 'No hay resultados registrados'
            })
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor' + error
        })
    }
}

export const registrarResultados = async (req, res) => {

    try {

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(403).json(errors)
        }
        
        const{fecha, fk_analisis, fk_variables, valor, observaciones, estado} = req.body
        
        let sql = `INSERT INTO resultados (fecha, fk_analisis, fk_variables, observaciones, valor, estado) values (?, ?, ?, ?, ?, ?)`

        const[rows] = await pool.query(sql, [fecha, fk_analisis, fk_variables, observaciones, valor, estado])

        if(rows.affectedRows>0){
            res.status(200).json({
                'status': 200,
                'message': 'Se realizo el registro con exito'
            })
        } else {
            res.status(403).json({
                'status': 403,
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
        
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(403).json(errors)
        }

        const{fecha, fk_analisis, fk_variable, observaciones, valor} = req.body
        const {id} = req.params

        const[rows] = await pool.query(`UPDATE resultados SET fecha=IFNULL(?,fecha), fk_analisis=IFNULL(?,fk_analisis), fk_variables=IFNULL(?,fk_variables), observaciones=IFNULL(?,observaciones), valor=IFNULL(?,valor) WHERE codigo= ?`,[fecha, fk_analisis, fk_variable, observaciones, valor, id]);

        if(rows.affectedRows>0){
            res.status(200).json({
                'status': 200,
                'message': 'Se actualizo con exito el resultado'
            })
        } else {
            res.status(403).json({
                'status': 403,
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

export const desactivarResultado = async (req, res) => {

    try {
        
        let idResultado = req.params.idResultado
        let sql = `UPDATE resultados SET estado = 2 WHERE codigo = ?`

        const[rows] = await pool.query(sql, [idResultado])

        if(rows.affectedRows>0){
            res.status(200).json({
                'status': 200,
                'message': 'Se desactivó con exito el resultado'
            })
        }else {
            res.status(403).json({
                'status': 403,
                'message': 'Error  al intentar desactivar el resultado'
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
            message: 'Error del servidor' + error
        })
    }
}