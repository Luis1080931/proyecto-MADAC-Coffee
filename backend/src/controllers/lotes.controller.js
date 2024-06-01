import {pool} from '../database/conexion.js'
import { validationResult } from 'express-validator'


export const getLotes = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT l.codigo, l.numero_arboles, l.fk_finca, f.nombre_finca AS finca_nombre, v.nombre AS fk_variedad, l.estado
            FROM lotes l
            LEFT JOIN variedades v ON l.fk_variedad = v.codigo
            LEFT JOIN fincas f ON l.fk_finca = f.codigo
        `);

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({
                message: "No encontramos a ningun lote"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor: " + error
        });
    }
};

export const getLote = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT l.codigo, l.numero_arboles, v.nombre AS fk_variedad, l.estado, f.nombre_finca AS finca_nombre
            FROM lotes l
            JOIN variedades v ON l.fk_variedad = v.codigo
            JOIN fincas f ON l.fk_finca = f.codigo
            WHERE l.codigo = ?
        `, [req.params.codigo]);

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({
                message: "No se encontró ningun lote"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor: " + error
        });
    }
};

export const buscarIdFinca = async (req, res) => {
    try {
        const { fk_finca } = req.params;
        const [rows] = await pool.query(`
            SELECT l.codigo, l.numero_arboles, l.fk_finca, f.nombre_finca AS finca_nombre, v.nombre AS fk_variedad, l.estado
            FROM lotes l
            LEFT JOIN variedades v ON l.fk_variedad = v.codigo
            LEFT JOIN fincas f ON l.fk_finca = f.codigo
            WHERE l.fk_finca = ?
        `, [fk_finca]);

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({
                message: "No se encontró ningun lote al nombre de esa finca"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor: " + error
        });
    }
};

export const postLotes=async(req,res)=>{
    try{
        
        const errores=validationResult(req)
        if(!errores.isEmpty()){
            return res.status(400).json(errores.array());
        }
        const {numero_arboles,fk_finca,fk_variedad}=req.body
        const [rows]=await pool.query('INSERT INTO lotes (numero_arboles,fk_finca,fk_variedad,estado) VALUES(?,?,?,1)',[numero_arboles,fk_finca,fk_variedad])
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

export const activarLotes = async (req, res) => {
    try {
        const { codigo } = req.params
        let sql = `UPDATE lotes SET estado = 1 WHERE codigo = ?`

        const [rows] = await pool.query(sql, [codigo])

        if(rows.affectedRows>0){
            res.status(200).json({
                status: 200,
                message: 'Se activó con éxito el lote'
            })
        }else{
            res.status(403).json({
                status: 403,
                message: 'No se pudo activar el lote'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error del servidor" + error
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

export const lotesActivos = async (req, res) => {
    try {
        const [rows]=await pool.query(`SELECT l.codigo, l.numero_arboles, l.fk_finca, v.nombre AS fk_variedad, l.estado
        FROM lotes l
        LEFT JOIN variedades v ON l.fk_variedad = v.codigo WHERE l.estado = 1`)
      
        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({
                message:"No encontramos a ningun lote"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor: " + error
        });
    }
};