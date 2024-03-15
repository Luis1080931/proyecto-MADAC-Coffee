import {pool} from '../database/conexion.js'
import { validationResult } from 'express-validator'


export const getLotes=async(req,res)=>{
    try{
        const [rows]=await pool.query('SELECT * FROM lotes')
        if(rows.length > 0){
            res.status(200).json(rows)
        }else{
            res.status(404).json({
                message:"No encontramos a ningun lote"
            })
        }
    }catch(error){
        res.status(500).json({
            message:"error en el servidor"+error
        })
    }
}
export const getLote=async(req,res)=>{
    try{
        const [rows] =await pool.query('SELECT * FROM lotes WHERE codigo=?',[req.params.codigo])
        if(rows.length > 0){
            res.status(200).json(rows)
        }else{
            res.status(404).json({
                message:"No se encontró ningun lote"
            })
        }
    }catch(error){
        res.status(500).json({
            message:"error en el servidor"+error
        })
    }
}
export const postLotes=async(req,res)=>{
    try{
        
        const errores=validationResult(req)
        if(!errores.isEmpty()){
            return res.status(400).json(errores.array());
        }
        const {numero_arboles,fk_finca,fk_variedad,estado}=req.body
        const [rows]=await pool.query('INSERT INTO lotes (numero_arboles,fk_finca,fk_variedad,estado) VALUES(?,?,?,?)',[numero_arboles,fk_finca,fk_variedad,estado])
        if(rows.affectedRows > 0){
            res.status(200).json({
                message:"Lote registrado correctamente"
        })
        }else{
            res.status(403).json({
                message:"No se pudo registrar el lote"
        })
        }
    }catch(error){
        res.status(500).json({
            message:"error en el servidor"+error
        })
    }
}
export const desactivar_Lotes=async(req,res)=>{
    try{
        const {codigo}=req.params
        const [result]=await pool.query('UPDATE lotes SET estado=2 WHERE codigo=?',[codigo])
        
        if(result.affectedRows > 0){
            res.status(200).json({
                message:"Lote desactivado exitosamente"})
             
        }
        else{
            res.status(403).json({
                message:"No se pudo desactivar el lote"
            })
        }
    }catch(error){
        res.status(500).json({
            message:"error en el servidor"+error
        })
    }
}

export const actualizarLotes =async(req,res)=>{
    try{

        const erroress=validationResult(req)
        if(!erroress.isEmpty()){
            return res.status(400).json(erroress.array());
        }
        const{codigo}=req.params
        const{numero_arboles,fk_finca,fk_variedad}=req.body
        const [result]=await pool.query('UPDATE lotes SET numero_arboles=IFNULL(?,numero_arboles),fk_finca=IFNULL(?,fk_finca),fk_variedad=IFNULL(?,fk_variedad) WHERE codigo=?',[numero_arboles,fk_finca,fk_variedad,codigo])
        if(result.affectedRows > 0){
            res.status(200).json({
                message:"Lote actualizado exitosamente"})
        }
        else{
            res.status(403).json({
                message:"No se pudo actualizar el lote"
            })
        }
    }catch(error){
        res.status(500).json({
            message:"error en el servidor"+error
        })
    }
}