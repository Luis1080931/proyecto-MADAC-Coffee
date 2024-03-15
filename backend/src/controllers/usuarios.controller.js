//registrar, editar, actualizar, desactivar.

import { validationResult } from "express-validator"
import { pool } from "../database/conexion.js"
import { query } from "express"


//Registrar
export const registrarUsuarios = async (req,res)=>{

    try {

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(403).json(errors)
        }

        const{ identificacion, telefono, nombre, correo_electronico, tipo_usuario, password} = req.body
        const [resultado] = await pool.query("INSERT INTO usuarios(identificacion, telefono, nombre, correo_electronico, tipo_usuario, password, estado) VALUES(?, ?, ?, ?, ?, ?, 1)",[identificacion, telefono, nombre, correo_electronico, tipo_usuario, password])
        if (resultado.affectedRows > 0) {

            res.status(201).json(
                {
                    "mensaje": "Usuario registrado con exito!!"
                }
            )
            
        } else{
            res.status(403).json(
                {
                    "mensaje": "No se pudo registrar el usuario!"
                }
            )
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": "Error del servidor" + error
        })
    }
}

// listar
export const listarUsuarios=async(req,res)=>{
    try {

        const [usuarios] = await pool.query("SELECT * FROM usuarios")

        if (usuarios.length>0) {
            res.status(200).json({usuarios})
        } else {
        res.status(404).json({
            "mensaje":"No hay usuarios registrados"
        })
        }
        
        
    } catch (error) {
        res.status(500).json({
            "mensaje": "Error del servidor" + error
        })
    }
}
// Buscar

export const buscarUsuarios=async(req,res)=>{
    try {

        const {identificacion} =req.params

        const [usuario] =await pool.query("SELECT * FROM usuarios where identificacion = ?",[identificacion])
        
        if (usuario.length>0) {
            res.status(200).json(usuario)
        } else {
            res.status(404).json({
                "mensaje":"el usuario no existe"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje": "Error del servidor" + error
        })
    }
}

//Actualizar
export const actualizarUsuarios = async (req,res)=>{

    try {

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(403).json(errors)
        }


        const { identificacion } = req.params
        const{ telefono, nombre, correo_electronico, tipo_usuario, estado} = req.body
        
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
                    "mensaje": "Usuario actualizado con exito!!"
                }
            )
            
        } else{
            res.status(404).json(
                {
                    "mensaje": "No se pudo actualizar el usuario!"
                }
            )
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": "Error del servidor" + error
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
            "mensaje": "Error del servidor" + error
        })
    }
}