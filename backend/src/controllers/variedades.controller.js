import { query } from "express"
import { pool } from '../database/conexion.js'
import { validationResult } from "express-validator"

//Registrar
export const registrarVariedades = async (req, res) => {
    try {

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(403).json(errors)
        }

        const { nombre } = req.body
        const [ resultado ] = await pool.query("INSERT INTO variedades(nombre, estado) VALUES (?, 1)", [nombre])

        
        if (resultado.affectedRows > 0) {
            res.status(201).json({
                message: "Variedad creada con exito!"
            })
        } else {
            res.status(403).json({
                message: "No se pudo crear la variedad"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}
//Actualizar
export const actualizarVariedades = async (req, res) => {
    try {

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(403).json(errors)
        }
        
        const { codigo } = req.params
        const { nombre } = req.body
        
        const [ variedadesPasado ] = await pool.query("select * from variedades where codigo=?", [codigo])
        const [ resultado ] = await pool.query(`update variedades set 
                                            nombre='${nombre ? nombre : variedadesPasado[0].nombre}', 
                                            estado=1 where codigo=? `, [codigo])

        if (resultado.affectedRows > 0) {
            res.status(201).json({
                message: "Variedad actualizada con exito"
            })
        } else {
            res.status(403).json({
                message: "No se pudo actualizar la variedad"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

export const desactivarVariedades = async (req, res) => {
    try {
        const { codigo } = req.params;

        let sql = `UPDATE variedades SET estado = 2 WHERE codigo = ?`
        const [rows] = await pool.query(sql, [codigo])

        if(rows.affectedRows>0){
            res.status(200).json({
                message:"Variedad desactivada con exito"
            })
        }else{
            res.status(403).json({
                status: 403,
                message:"No se pudo desactivar la variedad"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message || "Ocurrió un error interno"
        });
    }
}

export const activarVariedades = async (req, res) => {
    try {
        const { codigo } = req.params
        let sql = `UPDATE variedades SET estado = 1 WHERE codigo = ?`

        const [rows] = await pool.query(sql, [codigo])

        if(rows.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: 'Se activó con éxito la variedad'
            })
        }else{
            res.status(403).json({
                status: 403,
                message: 'No se pudo activar la variedad'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
}


// Listar
export const listarVariedades=async(req,res)=>{
    try {

        const [variedades] = await pool.query("SELECT * FROM variedades")

        if (variedades.length>0) {
            res.status(200).json(variedades)
        } else {
        res.status(404).json({
            message:"No hay variedades registradas"
        })
        }
        
        
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
}
// Buscar
export const buscarVariedades=async(req,res)=>{
    try {

        const {codigo} =req.params

        const [variedades] =await pool.query("SELECT * FROM variedades where codigo = ?",[codigo])
        
        if (variedades.length>0) {
            res.status(200).json(variedades)
        } else {
            res.status(403).json({
                message:"La variedad no existe"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
}

export const variedadesActivas = async (req,res)=>{
    try {

        const [variedades] = await pool.query("SELECT * FROM variedades WHERE estado = 1")

        if (variedades.length>0) {
            res.status(200).json(variedades)
        } else {
        res.status(404).json({
            message:"No hay variedades registradas"
        })
        }
        
        
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
}