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

        const { nombre, estado } = req.body
        const [ resultado ] = await pool.query("INSERT INTO variedades(nombre, estado) VALUES (?, ?)", [nombre, estado])

        
        if (resultado.affectedRows > 0) {
            res.status(201).json({
                "mensaje": "Variedad creada con exito!"
            })
        } else {
            res.status(403).json({
                "mensaje": "No se pudo crear la variedad"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
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
        const { nombre, estado } = req.body
        
        const [ variedadesPasado ] = await pool.query("select * from variedades where codigo=?", [codigo])
        const [ resultado ] = await pool.query(`update variedades set 
                                            nombre='${nombre ? nombre : variedadesPasado[0].nombre}', 
                                            estado='${estado ? estado : variedadesPasado[0].estado}' where codigo=? `, [codigo])

        if (resultado.affectedRows > 0) {
            res.status(201).json({
                "mensaje": "Variedad actualizada con exito"
            })
        } else {
            res.status(403).json({
                "mensaje": "No se pudo actualizar la variedad"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

//Desactivar
export const desactivarVariedades = async (req, res) => {
    try {
        const { codigo } = req.params
        const [ resultado ] = await pool.query("update variedades set estado='inactivo' where codigo=?", [codigo])

        if (resultado.affectedRows > 0) {
            res.status(201).json({
                "mensaje": "Variedad desactivada con exito"
            })
        } else {
            res.status(403).json({
                "mensaje": "No se pudo desactivar la variedad"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

// Listar
export const listarVariedades=async(req,res)=>{
    try {

        const [variedades] = await pool.query("SELECT * FROM variedades")

        if (variedades.length>0) {
            res.status(200).json({variedades})
        } else {
        res.status(404).json({
            "mensaje":"No hay variedades registradas"
        })
        }
        
        
    } catch (error) {
        res.status(500).json({
            "mensaje":error
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
                "mensaje":"La variedad no existe"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje":error
        })
    }
}