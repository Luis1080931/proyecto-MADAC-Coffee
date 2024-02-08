//registrar, editar, actualizar, desactivar.

import { pool } from "../database/conexion.js"
import { query } from "express" 


//Registrar
export const registrarUsuarios = async (req,res)=>{

    try {
        const{ identificacion, telefono, nombre, correo_electronico, tipo_usuario, estado
        } = req.body
        const [resultado] = await pool.query("INSERT INTO usuarios(identificacion, telefono, nombre, correo_electronico, tipo_usuario, estado) VALUES(?, ?, ?, ?, ?, ?)",[identificacion, telefono, nombre, correo_electronico, tipo_usuario, estado])
        if (resultado.affectedRows > 0) {

            res.status(201).json(
                {
                    "mensaje": "Usuario registrado con exito!!"
                }
            )
            
        } else{
            res.status(404).json(
                {
                    "mensaje": "No se pudo registrar el usuario!"
                }
            )
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

//Editar
export const editarUsuarios = async (req,res)=>{

    try {
        const { identificacion } = req.params
        const{ telefono, nombre, correo_electronico, tipo_usuario, estado
        } = req.body
        
        const [ usuarioAnterior ] = await pool.query("select * from usuarios where identificacion=?", [identificacion])

        const [ resultado ] = await pool.query(`update usuarios set
        telefono='${telefono ? telefono : usuarioAnterior[0].telefono}',
        nombre='${nombre ? nombre : usuarioAnterior[0].nombre}', 
        correo_electronico='${correo_electronico ? correo_electronico : usuarioAnterior[0].correo_electronico}', 
        tipo_usuario='${tipo_usuario ? tipo_usuario : usuarioAnterior[0].tipo_usuario}', 
        estado='${estado ? estado : usuarioAnterior[0].estado}' where identificacion=? `, [identificacion])

         if (resultado.affectedRows > 0) {

            res.status(201).json(
                {
                    "mensaje": "Usuario editado con exito!!"
                }
            )
            
        } else{
            res.status(404).json(
                {
                    "mensaje": "No se pudo editar el usuario!"
                }
            )
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

// desactivar usuarios

export const desactivarUsuarios = async (req,res)=>{

    try {
        const { identificacion } = req.params
        const [ resultado ] = await pool.query("UPDATE usuarios set estado='inactivo' where identificacion=?",[identificacion])

         if (resultado.affectedRows > 0) {

            res.status(201).json(
                {
                    "mensaje": "Usuario se desactivo con exito!!"
                }
            )
            
        } else{
            res.status(404).json(
                {
                    "mensaje": "No se pudo desactivar el usuario!"
                }
            )
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}