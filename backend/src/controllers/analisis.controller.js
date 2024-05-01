import { query } from "express"
import { pool } from '../database/conexion.js'
import { validationResult } from "express-validator"    

//Registrar
export const registrarAnalisis = async (req, res) => {
    try {

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(403).json(errors)
        }

        const { fecha, analista, fk_muestra, fk_tipo_analisis } = req.body
        const [ resultado ] = await pool.query("INSERT INTO analisis(fecha, fk_analista, fk_muestra, fk_tipo_analisis, estado) VALUES (?, ?, ?, ?, 1)", [fecha, analista, fk_muestra, fk_tipo_analisis])

        if (resultado.affectedRows > 0) {
            res.status(201).json({
                message: "Analisis creado con exito!"
            })
        } else {
            res.status(403).json({
                message: "No se pudo crear el analisis"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

//Actualizar
export const actualizarAnalisis = async (req, res) => {
    try {

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(403).json(errors)
        }

        const { codigo } = req.params
        const { fecha, analista, fk_muestra, fk_tipo_analisis, estado } = req.body
        
        const[resultado] = await pool.query(`UPDATE analisis SET fecha=IFNULL(?,fecha), analista=IFNULL(?,analista), fk_muestra=IFNULL(?,fk_muestra), fk_tipo_analisis=IFNULL(?,fk_tipo_analisis), estado=IFNULL(?,estado) WHERE codigo= ?`,[fecha, analista, fk_muestra, fk_tipo_analisis, estado, codigo]);


        if (resultado.affectedRows > 0) {
            res.status(201).json({
                message: "Analisis actualizado con exito!"
            })
        } else {
            res.status(403).json({
                message: "No se pudo actualizar el analisis"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Error del servidor" + error
        })
    }
}

//Desactivar
// export const desactivarAnalisis = async (req, res) => {
//     try {
//         const { codigo } = req.params
//         const [ resultado ] = await pool.query("update analisis set estado='inactivo' where codigo=?", [codigo])

//         if (resultado.affectedRows > 0) {
//             res.status(201).json({
//                 message: "Analisis desactivado con exito!"
//             })
//         } else {
//             res.status(403).json({
//                 message: "No se pudo desactivar el analisis"
//             })
//         }

//     } catch (error) {
//         res.status(500).json({
//             message: error
//         })
//     }
// }

export const desactivarAnalisis = async (req, res) => {
    try {
        const { codigo } = req.params;

        let sql = `UPDATE analisis SET estado = 2 WHERE codigo = ?`

        const [rows] = await pool.query(sql, [codigo])

        if (rows.affectedRows > 0) {
            res.status(200).json({
                message: "Se desactivó con exito el analisis"
            })
        } else {
            res.status(404).json({
                status: 404,
                message: 'El analisis no existe'
            })
        }
        

    } catch (error) {
        res.status(500).json({
            message: error.message || "Ocurrió un error interno"
        });
    }
}

export const activarAnalisis = async (req, res) => {
    try {
        const { codigo } = req.params
        let sql = `UPDATE analisis SET estado = 1 WHERE codigo = ?`

        const [rows] = await pool.query(sql, [codigo])

        if(rows.affectedRows>0){
            res.status(200).json({
                message: "Se activó con exito el analisis"
            })
        }else{
            res.status(404).json({
                status: 404,
                message: 'El analisis no existe'
            })
        }
    } catch (error) {
        res.status(500).json({status: 500, message: 'Error del servidor' + error})
    }
}


//Listar
export const listarAnalisis = async (req,res) => {
    try {

        const [analisis] = await pool.query(`SELECT codigo, fecha, nombre AS analista, fk_muestra AS muestra, tipo_analisis , a.estado FROM analisis AS a JOIN usuarios ON fk_analista = identificacion JOIN tipo_analisis ON fk_tipo_analisis = id`)

        if (analisis.length>0) {
            res.status(200).json(analisis)
        } else {
        res.status(404).json({
            message:"No hay analisis registrados"
        })
        }
        
        
    } catch (error) {
        res.status(500).json({
            message: "Error del servidor" + error
        })
    }
}
//Buscar
export const buscarAnalisis=async(req,res)=>{
    try {

        const {codigo} =req.params

        const [analisis] =await pool.query(`SELECT codigo, fecha, nombre AS analista, fk_muestra AS muestra, tipo_analisis , a.estado FROM analisis AS a JOIN usuarios ON fk_analista = identificacion JOIN tipo_analisis ON fk_tipo_analisis = id WHERE a.codigo = ?`, [codigo])
        
        if (analisis.length>0) {
            res.status(200).json(analisis)
        } else {
            res.status(404).json({
                message:"El analisis no existe"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
}