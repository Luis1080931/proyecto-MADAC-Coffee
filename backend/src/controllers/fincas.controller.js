import {pool} from '../database/conexion.js'
import {validationResult} from 'express-validator'

export const getFincas = async (req, res) => {
    try {
        const query = `
            SELECT f.codigo, f.dimension_mt2, u.nombre AS fk_caficultor, m.nombre AS municipio, f.vereda, f.estado
            FROM fincas f
            JOIN usuarios u ON f.fk_caficultor = u.identificacion
            JOIN municipios AS m ON municipio = id_municipio

        `;
        const [rows] = await pool.query(query);
        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({
                message: "No se encontraron fincas"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor: " + error
        });
    }
};

export const getFinca = async (req,res)=>{
    try{
        const [rows]=await pool.query(`
        SELECT f.codigo, f.dimension_mt2, u.nombre AS fk_caficultor, m.nombre AS municipio, f.vereda, f.estado
        FROM fincas f
        JOIN usuarios u ON f.fk_caficultor = u.identificacion
        JOIN municipios AS m ON municipio = id_municipio
        WHERE f.codigo = ?
    `,[req.params.codigo])
        if(rows.length > 0){
            res.status(200).json(rows)
        }else{
            res.status(404).json({
                message: "No se encontraron fincas"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor: " + error
        });
    }
};


export const postFincas=async(req,res)=>{
    try{

        const errors=validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array());
        }
        const {dimension_mt2,fk_caficultor,municipio,vereda}=req.body
        const [rows]=await pool.query('INSERT INTO fincas (dimension_mt2,fk_caficultor,municipio,vereda,estado) VALUES (?,?,?,?,1)',[dimension_mt2,fk_caficultor,municipio,vereda])
        if(rows.affectedRows > 0){
            res.status(200).json({
                message:"finca registrado correctamente"
        })
        }else{
            res.status(403).json({
                message:"no se pudo registrar Correctamente"
        })
        }
    }catch(error){
        res.status(500).json({
            message:"error en el servidor"+error
        })
    }
}
export const desactivar_Fincas=async(req,res)=>{
    try{
        const {codigo}=req.params
        const [result]=await pool.query('UPDATE fincas SET estado=2 WHERE codigo=?',[codigo])
        
        if(result.affectedRows > 0){
            res.status(200).json({
                message:"Finca desactivada exitosamente"})
        }
        else{
            res.status(404).json({
                message:"No se pudo desactivar la finca"
            })
        }
    }catch(error){
        res.status(500).json({
            message:"error en el servidor"+error
        })
    }
}

export const activarFinca = async (req, res) => {
    try {
        const { id } = req.params
        let sql = `UPDATE fincas SET estado = 1 WHERE codigo = ?`

        const [rows] = await pool.query(sql, [id])

        if(rows.affectedRows>0){
            res.status(200).json({
                status: 200,
                message: 'Se activó con éxito la finca',
            })
        }else{
            res.status(403).json({
                status: 403,
                message: 'No se pudo activar la finca',
            })
        }
    } catch (error) {
        res.status(500).json({
            status:500,
            message: "Error del servidor" + error
        })
    }
}

export const actualizarFincas = async(req,res)=>{
    try{

        const errorss=validationResult(req)
        if(!errorss.isEmpty()){
            return res.status(400).json(errorss.array());
        }
        const {codigo}=req.params
        const {dimension_mt2,fk_caficultor,municipio,vereda}=req.body
    
        const[result]=await pool.query('UPDATE fincas SET dimension_mt2=IFNULL(?,dimension_mt2),fk_caficultor=IFNULL(?,fk_caficultor),municipio=IFNULL(?,municipio),vereda=IFNULL(?,vereda) WHERE codigo=?',[dimension_mt2,fk_caficultor,municipio,vereda,codigo])
        if(result.affectedRows > 0){
            res.status(200).json({
                message:"finca actualizada exitosamente"})
        }
        else{
            res.status(403).json({
                message:"No fue posible actualizar la finca"
            })
        }

    }catch(error){
        res.status(500).json({
            message:"error en el servidor"+error
        })
    }
}
