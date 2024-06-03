import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";

//1 listar
export const listarVariables = async (req, res) => {
    try {
        let sql = 'SELECT v_codigo, nombre, fk_tipo_analisis AS tipo_analisis, v.estado FROM variables AS v JOIN tipo_analisis ON fk_tipo_analisis = id'
        const [result] = await pool.query(sql)

        if (result.length > 0 ) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                "Mensaje":"No hay variables"
            })
        }
    } catch (error) {
        res.status(500).json({
            status:500,
            message: "Error del servidor" + error
        })
    }
}

//2 crear variable 

export const CrearVariable = async (req, res) => {
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors);
        }

        const { nombre, fk_tipo_analisis } = req.body
        const [result] = await pool.query("INSERT INTO variables (nombre, fk_tipo_analisis, estado) VALUES (? , ? , 1 )", [nombre, fk_tipo_analisis ])
        

        if (result.affectedRows > 0 ) {
            res.status(200).json({
                status:(200),
                "message":'Se registro la variable con exito ',
            })
        } else {
            res.status(403).json({
                status:(403),
                "message":'No se registro la variable',
            })
        }
    } catch (error) {
        res.status(500).json({
            status:500,
            message: "Error del servidor" + error
        })
    }
}

//3 actualizar variable 

export const ActualizarVariable = async (req, res) => {
    try {
        // Función para validar.
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors);
        }

        const { codigo } = req.params;
        const { nombre, fk_tipo_analisis } = req.body;
        const [result] = await pool.query('UPDATE variables SET nombre = IFNULL(?, nombre), fk_tipo_analisis = IFNULL(?, fk_tipo_analisis) , estado = 1 WHERE v_codigo = ?', [nombre, fk_tipo_analisis, codigo]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'La variable ha sido actualizada correctamente.' });
        } else {
            res.status(403).json({ message: 'No se pudo actualizar la variable. Por favor, verifica los datos proporcionados.' });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error del servidor" + error
        });
    }
};


//4 desactivar variables 

export const desactivarVariable = async (req, res) => {
    try {
        const {codigo} = req.params; // Cambiado de 'codigo' a 'codigo'
        const [result] = await pool.query("UPDATE variables  SET estado= 2 WHERE v_codigo = ?", [ codigo]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                message: 'Se desactivó con éxito la variable',
            });
        } else {
            res.status(403).json({
                message: 'No se pudo desactivar la variable'
            });
        }
    } catch (error) {
        res.status(500).json({
            status:500,
            message: "Error del servidor" + error
        })
    }
}

//5 buscar variable 
export const buscarvariable = async (req, res) => {
    try {
        const { codigo } = req.params; 
        const [result] = await pool.query('SELECT v_codigo, nombre, fk_tipo_analisis AS tipo_analisis, tipo_analisis, v.estado FROM variables AS v JOIN tipo_analisis ON fk_tipo_analisis = id WHERE v_codigo = ?', [codigo]);
                                                        //nombre tabla
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                message: 'No se encontraron resultados para la búsqueda'
            });
        }
    } catch (error) {
        res.status(500).json({
            status:500,
            message: "Error del servidor" + error
        })
    }
}
//6 activar
export const activarVariable = async (req, res) => {
    try {
        const { codigo } = req.params
        let sql = `UPDATE variables SET estado = 1 WHERE v_codigo = ?`

        const [rows] = await pool.query(sql, [codigo])

        if(rows.affectedRows>0){
            res.status(200).json({
                status: 200,
                message: 'Se activó con exito la variable'
            })
        }else{
            res.status(403).json({
                status: 403,
                message: 'Error  al intentar activar la variable'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: "Error del servidor" + error
        })
    }
}
//7 buscar activas
export const variablesActivas = async (req, res) => {
    try {
        let sql = 'SELECT v_codigo, nombre, fk_tipo_analisis AS tipo_analisis, tipo_analisis, v.estado FROM variables AS v JOIN tipo_analisis ON fk_tipo_analisis = id WHERE v.estado = 1'
        const [result] = await pool.query(sql)

        if (result.length > 0 ) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                "Mensaje":"No hay variables encontradas"
            })
        }
    } catch (error) {
        res.status(500).json({
            status:500,
            message: "Error del servidor" + error
        })
    }
}