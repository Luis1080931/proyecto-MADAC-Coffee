import {pool} from '../database/conexion.js'

export const getLotes=async(req,res)=>{
    try{
        const [rows]=await pool.query('SELECT * FROM lotes')
        if(rows.length > 0){
            res.status(200).json(rows)
        }else{
            res.status(404).json({
                message:"no encontramos a ningun lote"
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
                message:"no se pudo registrar el lote"
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
        const {numero_arboles,fk_finca,fk_variedad,estado}=req.body
        const [rows]=await pool.query('INSERT INTO lotes (numero_arboles,fk_finca,fk_variedad,estado) VALUES(?,?,?,?)',[numero_arboles,fk_finca,fk_variedad,estado])
        if(rows.affectedRows > 0){
            res.status(200).json({
                message:"lote registrado Correctamente"
        })
        }else{
            res.status(404).json({
                message:"no se pudo registrar Correctamente"
        })
        }
    }catch(error){
        res.status(500).json({
            message:"error en el servidor"+error
        })
    }
}
export const activar_desactivar_Lotes=async(req,res)=>{
    try{
        const {codigo}=req.params
        const {estado}=req.body
        const [result]=await pool.query('UPDATE lotes SET estado=IFNULL(?,estado) WHERE codigo=?',[estado,codigo])
        
        if(result.affectedRows > 0){
            res.status(200).json({
                message:"lote desactivado exitosamente"})
        }
        else{
            res.status(404).json({
                message:"no encontramos a nadie con ese codigo"
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
        const{codigo}=req.params
        const{numero_arboles,fk_finca,fk_variedad}=req.body
        const [result]=await pool.query('UPDATE lotes SET numero_arboles=IFNULL(?,numero_arboles),fk_finca=IFNULL(?,fk_finca),fk_variedad=IFNULL(?,fk_variedad) WHERE codigo=?',[numero_arboles,fk_finca,fk_variedad,codigo])
        if(result.affectedRows > 0){
            res.status(200).json({
                message:"lote actualizado exitosamente"})
        }
        else{
            res.status(404).json({
                message:"no encontramos ningun lote"
            })
        }
    }catch(error){
        res.status(500).json({
            message:"error en el servidor"+error
        })
    }
}