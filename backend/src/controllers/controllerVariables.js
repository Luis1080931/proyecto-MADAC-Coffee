import { pool } from "../database/conexion.js";
import { validationResult } from "express-validator";


export const listarVariables = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM variables")

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

// crear variable 

//crud listar
export const CrearVariable = async (req, res) => {
    try {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors);
        }

        const { nombre, fk_tipo_analisis, estado } = req.body
        const [result] = await pool.query("INSERT INTO variables (nombre, fk_tipo_analisis, estado) VALUES (? , ? , ? )", [nombre, fk_tipo_analisis, estado])
        

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

// actualizar variable 

export const ActualizarVariable = async (req, res) => {
    try {
        const { codigo } = req.params;
        const { nombre, fk_tipo_analisis } = req.body;

        // La consulta debe tener placeholders para cada valor que se va a actualizar
        const [result] = await pool.query('UPDATE variables SET nombre = IFNULL(?, nombre), fk_tipo_analisis = IFNULL(?, fk_tipo_analisis) WHERE v_codigo = ?', [nombre, fk_tipo_analisis, codigo]);

        if (result.affectedRows >  0) {
            res.status(200).json({ message: 'La variable ha sido actualizada correctamente.' });
        } else {
            res.status(403).json({ message: 'No se pudo actualizar la variable. Por favor, verifica los datos proporcionados.' });
        }
    } catch (error) {
        res.status(500).json({
            status:500,
            message: "Error del servidor" + error
        })
    }
};

//activar desactivar variables 

export const desactivarVariable = async (req, res) => {
    try {
        const {codigo} = req.params; // Cambiado de 'codigo' a 'codigo'
        const [result] = await pool.query("UPDATE variables  SET estado= 2 WHERE v_codigo = ?", [ codigo]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: 'Se desactivó con éxito',
                result: result
            });
        } else {
            res.status(403).json({
                status: 403,
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

//buscar variable 
export const buscarvariable = async (req, res) => {
    try {
        const { id } = req.params; //esta es la caracterica para buscar
        const [result] = await pool.query("SELECT * FROM variables WHERE v_codigo = ?", [id]);
                                                        //nombre tabla
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({
                status: 404,
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