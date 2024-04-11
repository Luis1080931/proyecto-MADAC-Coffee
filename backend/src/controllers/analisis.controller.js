import { query } from "express"
import { pool } from '../database/conexion.js'
import { validationResult } from "express-validator"    

//Registrar
export const registrarAnalisis = async (req, res) => {
    try {

        const errors = validationResult(req)
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(403).json(errors)
        }

        const { fecha, analista, fk_muestra, fk_tipo_analisis } = req.body
        const [ resultado ] = await pool.query("INSERT INTO analisis(fecha, analista, fk_muestra, fk_tipo_analisis) VALUES (?, ?, ?, ?)", [fecha, analista, fk_muestra, fk_tipo_analisis])

        if (resultado.affectedRows > 0) {
            res.status(201).json({
                "mensaje": "Analisis creado con exito!"
            })
        } else {
            res.status(403).json({
                "mensaje": "No se pudo crear el analisis"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
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
                "mensaje": "Analisis actualizado con exito!"
            })
        } else {
            res.status(403).json({
                "mensaje": "No se pudo actualizar el analisis"
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
//                 "mensaje": "Analisis desactivado con exito!"
//             })
//         } else {
//             res.status(403).json({
//                 "mensaje": "No se pudo desactivar el analisis"
//             })
//         }

//     } catch (error) {
//         res.status(500).json({
//             "mensaje": error
//         })
//     }
// }

export const desactivarAnalisis = async (req, res) => {
    try {
        const { codigo } = req.params;

        // Obtener el estado actual del análisis
        const [analisis] = await pool.query("SELECT estado FROM analisis WHERE codigo = ?", [codigo]);

        // Verificar si el análisis existe
        if (analisis.length === 0) {
            return res.status(404).json({
                "mensaje": "El análisis no existe"
            });
        }

        const estadoActual = analisis[0].estado;

        // Determinar la acción a realizar según el estado actual
        let nuevaEstado = '';
        if (estadoActual === 'activo') {
            nuevaEstado = 'inactivo';
        } else if (estadoActual === 'inactivo') {
            nuevaEstado = 'activo';
        }

        // Cambiar el estado del análisis
        const [resultado] = await pool.query("UPDATE analisis SET estado = ? WHERE codigo = ?", [nuevaEstado, codigo]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({
                "mensaje": `El análisis ha sido ${nuevaEstado === 'activo' ? 'activado' : 'desactivado'} exitosamente`
            });
        } else {
            res.status(403).json({
                "mensaje": "No se pudo cambiar el estado del análisis"
            });
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error.message || "Ocurrió un error interno"
        });
    }
}


//Listar
export const listarAnalisis = async (req,res) => {
    try {

        const [analisis] = await pool.query(`SELECT codigo, fecha, nombre AS analista, fk_muestra AS muestra, tipo_analisis , a.estado FROM analisis AS a JOIN usuarios ON fk_analista = identificacion JOIN tipo_analisis ON fk_tipo_analisis = id`)

        if (analisis.length>0) {
            res.status(200).json(analisis)
            res.status(200).json(analisis)
        } else {
        res.status(404).json({
            "mensaje":"No hay analisis registrados"
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
                "mensaje":"El analisis no existe"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje":error
        })
    }
}