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
                    message: "Usuario registrado con exito!!"
                }
            )
            
        } else{
            res.status(403).json(
                {
                    message: "No se pudo registrar el usuario!"
                }
            )
        }
    } catch (error) {
        res.status(500).json({
            message: "Error del servidor" + error
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
            message:"No hay usuarios registrados"
        })
        }
        
        
    } catch (error) {
        res.status(500).json({
            message: "Error del servidor" + error
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
                message:"el usuario no existe"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Error del servidor" + error
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
        const{ telefono, nombre, correo_electronico, tipo_usuario } = req.body
        
        const [ usuarioAnterior ] = await pool.query("select * from usuarios where identificacion=?", [identificacion])

        const [ resultado ] = await pool.query(`update usuarios set
        telefono='${telefono ? telefono : usuarioAnterior[0].telefono}',
        nombre='${nombre ? nombre : usuarioAnterior[0].nombre}', 
        correo_electronico='${correo_electronico ? correo_electronico : usuarioAnterior[0].correo_electronico}', 
        tipo_usuario='${tipo_usuario ? tipo_usuario : usuarioAnterior[0].tipo_usuario}', 
        estado=1 where identificacion=? `, [identificacion])

         if (resultado.affectedRows > 0) {

            res.status(201).json(
                {
                    message: "Usuario actualizado con exito!!"
                }
            )
            
        } else{
            res.status(404).json(
                {
                    message: "No se pudo actualizar el usuario!"
                }
            )
        }

    } catch (error) {
        res.status(500).json({
            message: "Error del servidor" + error
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
                    message: "Usuario se desactivo con exito!!"
                }
            )
            
        } else{
            res.status(404).json(
                {
                    message: "No se pudo desactivar el usuario!"
                }
            )
        }

    } catch (error) {
        res.status(500).json({
            message: "Error del servidor" + error
        })
    }
}

export const activarUsuarios = async (req, res) => {
    try {
        const { identificacion } = req.params
        let sql = `UPDATE usuarios SET estado = 1 WHERE identificacion = ?`

        const [rows] = await pool.query(sql, [identificacion])

        if(rows.affectedRows>0){
            res.status(200).json({
               'status': 200,
               'message': 'Se activó con exito el usuario'
            })
        }else{
            res.status(403).json({
               'status': 403,
               'message': 'No se pudo activar el usuario'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error en el servidor' + error
        })
    }
}

export const usuariosCaficultores = async (req, res) => {
    try {
        let sql = `SELECT * FROM usuarios WHERE tipo_usuario = 3 AND estado = 1`
        const [rows] = await pool.query(sql)

        if(rows.length>0){
            res.status(200).json(rows)
        }else{
            res.status(404).json({
                status: 404,
                message: 'No hay usuarios registrados con este rol'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
}

export const usuariosCatadores = async (req, res) => {
    try {
        let sql = `SELECT * FROM usuarios WHERE tipo_usuario = 2 AND estado = 1`
        const [rows] = await pool.query(sql)

        if(rows.length>0){
            res.status(200).json(rows)
        }else{
            res.status(404).json({
                status: 404,
                message: 'No hay usuarios registrados con este rol'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Error del servidor' + error
        })
    }
}