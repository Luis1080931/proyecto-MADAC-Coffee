import { query } from "express" 
import { pool } from "../database/conexion.js" 
import { validationResult } from "express-validator"

export const listarResultados = async (req, res) => {

    try {
        
        let sql = `SELECT codigo, fecha, fk_analisis AS analisis, nombre AS variable, v_codigo, valor, r.estado FROM resultados AS r JOIN variables ON fk_variables = v_codigo`

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
        
        const{fecha, fk_analisis, fk_variables, valor} = req.body
        
        let sql = `INSERT INTO resultados (fecha, fk_analisis, fk_variables, valor, estado) values (?, ?, ?, ?, 1)`

        const[rows] = await pool.query(sql, [fecha, fk_analisis, fk_variables, valor])

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

        const{fecha, fk_analisis, fk_variables, valor} = req.body
        const {id} = req.params
        console.log(id);

        const[rows] = await pool.query(`UPDATE resultados SET fecha=IFNULL(?,fecha), fk_analisis=IFNULL(?,fk_analisis), fk_variables=IFNULL(?,fk_variables), valor=IFNULL(?,valor), estado=1 WHERE codigo= ?`,[fecha, fk_analisis, fk_variables, valor, id]);

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

export const activarResultado = async (req, res) => {
    try {
        let id = req.params.id
        let sql = `UPDATE resultados SET estado = 1 WHERE codigo = ?`

        const [rows] = await pool.query(sql, [id])

        if(rows.affectedRows>0){
            res.status(200).json({
                status: 200,
                message: 'Se activo el resultado con exito'
            })
        }else{
            res.status(403).json({
                status: 403,
                message: 'No se pudo activar el resultado'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
}

export const buscarResultados = async (req, res) => {

    try {
        
        let idResultado = req.params.idResultado
        let sql = `SELECT fecha, fk_analisis AS analisis, fk_variables AS variable, observaciones, valor FROM resultados JOIN variables ON fk_variables = v_codigo where codigo = ?`

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

export const registrarSensorial = async (req, res) => {
    try {
        const {fecha, aroma, sabor, postgusto, acidez, cuerpo, uniformidad, balance, taza_limpia, dulzura, general, punteo, taza_defecto, intensidad_defecto, sub_defecto, punteo_final, notas, fk_analisis} = req.body

        let sql = `INSERT INTO sensoriales (fecha, aroma, sabor, postgusto, acidez, cuerpo, uniformidad, balance, taza_limpia, dulzura, general, punteo, taza_defecto, intensidad_defecto, sub_defecto, punteo_final, notas, fk_analisis) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

        const [rows] = await pool.query(sql, [fecha, aroma, sabor, postgusto, acidez, cuerpo, uniformidad, balance, taza_limpia, dulzura, general, punteo, taza_defecto, intensidad_defecto, sub_defecto, punteo_final, notas, fk_analisis])

        if(rows.affectedRows>0){
            res.status(200).json({
                status: 200,
                message: 'Se realizó con exito el registro'
            })
        }else{
            res.status(403).json({
                status: 403,
                message: 'No se pudo realizar el registro'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
}

export const actualizarSensorial = async (req, res) => {
    try {
        const {fecha, aroma, sabor, postgusto, acidez, cuerpo, uniformidad, balance, taza_limpia, dulzura, general, punteo, taza_defecto, intensidad_defecto, sub_defecto, punteo_final, notas, fk_analisis} = req.body
        const {id} = req.params

        const [rows] = await pool.query(`UPDATE sensoriales SET fecha=IFNULL(?, fecha), aroma=IFNULL(?, aroma), sabor=IFNULL(?, sabor), postgusto=IFNULL(?, postgusto), acidez=IFNULL(?, acidez), cuerpo=IFNULL(?, cuerpo), uniformidad=IFNULL(?, uniformidad), balance=IFNULL(?, balance), taza_limpia=IFNULL(?, taza_limpia), dulzura=IFNULL(?, dulzura), general=IFNULL(?, general), punteo=IFNULL(?, punteo), taza_defecto=IFNULL(?, taza_defecto), intensidad_defecto=IFNULL(?, intensidad_defecto), sub_defecto=IFNULL(?, sub_defecto), punteo_final=IFNULL(?, punteo_final), notas=IFNULL(?, notas), fk_analisis=IFNULL(?, fk_analisis) WHERE codigo = ?`, [fecha, aroma, sabor, postgusto, acidez, cuerpo, uniformidad, balance, taza_limpia, dulzura, general, punteo, taza_defecto, intensidad_defecto, sub_defecto, punteo_final, notas, fk_analisis, id])

        if(rows.affectedRows>0){
            res.status(200).json({
                status: 200,
                message: 'Se actualizó con exito el resultado'
            })
        }else{
            res.status(403).json({
                status: 403,
                message: 'No se pudo realizar la actualizacion'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
}