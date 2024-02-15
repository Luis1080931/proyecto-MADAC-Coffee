import {pool} from '../database/conexion.js'

export const getFincas=async(req,res)=>{
    try{
        const [rows]=await pool.query('SELECT * FROM fincas')
        if(rows.length > 0){
            res.status(200).json(rows)
        }else{
            res.status(404).json({
                message:"no encontramos a ninguna finca"
            })
        }
    }catch(error){
        res.status(500).json({
            message:"error en el servidor"+error
        })
    }
}
export const getFinca = async (req,res)=>{
    try{
        const [rows]=await pool.query('SELECT * FROM fincas WHERE codigo=?',[req.params.codigo])
        if(rows.length > 0){
            res.status(200).json(rows)
        }else{
            res.status(404).json({
                message:"no encontramos a la finca"
            })
        }
    }catch(error){
        res.status(500).json({
            message:"error en el servidor"+error
        })
    }
}
export const postFincas=async(req,res)=>{
    try{
        const {dimension_mt2,fk_caficultor,municipio,vereda,estado}=req.body
        const [rows]=await pool.query('INSERT INTO fincas (dimension_mt2,fk_caficultor,municipio,vereda,estado) VALUES (?,?,?,?,?)',[dimension_mt2,fk_caficultor,municipio,vereda,estado])
        /*el rows significa que solo esta pidiendo las filas ya que si no estuviera nos daria todo el codigo  */
        /*res.send es para que nos muestren los datos*/
        if(rows.affectedRows > 0){
            res.status(200).json({
                message:"finca registrado Correctamente"
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
export const activar_desactivar_Fincas=async(req,res)=>{
    try{
        const {codigo}=req.params
        const {estado}=req.body
        const [result]=await pool.query('UPDATE fincas SET estado=IFNULL(?,estado) WHERE codigo=?',[estado,codigo])
        
        if(result.affectedRows > 0){
            res.status(200).json({
                message:"finca desactivado exitosamente"})
        }
        else{
            res.status(404).json({
                message:"no encontramos a nadie"
            })
        }
    }catch(error){
        res.status(500).json({
            message:"error en el servidor"+error
        })
    }
}
export const actualizarFincas = async(req,res)=>{
    try{
        const {codigo}=req.params
        const {dimension_mt2,fk_caficultor,municipio,vereda}=req.body
    
        const[result]=await pool.query('UPDATE fincas SET dimension_mt2=IFNULL(?,dimension_mt2),fk_caficultor=IFNULL(?,fk_caficultor),municipio=IFNULL(?,municipio),vereda=IFNULL(?,vereda) WHERE codigo=?',[dimension_mt2,fk_caficultor,municipio,vereda,codigo])
        if(result.affectedRows > 0){
            res.status(200).json({
                message:"finca actualizada exitosamente"})
        }
        else{
            res.status(404).json({
                message:"no encontramos a nadie"
            })
        }

    }catch(error){
        res.status(500).json({
            message:"error en el servidor"+error
        })
    }
}
