import { pool } from "../database/conexion.js";


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
        res.status(500).json({"Mensaje": error})
    }
}

// crear variable 

//crud listar
export const CrearVariable = async (req, res) => {
    try {
        const { nombre, fk_tipo_analisis, estado } = req.body
        const [result] = await pool.query("INSERT INTO variables (nombre, fk_tipo_analisis, estado) VALUES (? , ? , ? )", [nombre, fk_tipo_analisis, estado])
        

        if (result.affectedRows > 0 ) {
            res.status(200).json({
                status:(200),
                "message":'se registro la Variable con exito ',
                result:result
            })
        } else {
            res.status(404).json({
                status:(404),
                "message":'no se registro la Variable',
            })
        }
    } catch (error) {
        res.status(500).json({
            status:500,
            message:error
        })
    }
}

// actualizar variable 

export const ActualizarVariable = async (req, res) => {
    try {
        const { codigo, nombre, fk_tipo_analisis, estado } = req.body;
        
        // se asegura de que el valor sea numerico
        if (!Number.isInteger(codigo)) {
            return res.status(400).json({
                "mensaje": "El campo 'codigo' debe ser un número entero."
            });
        }
        
        const [oldPost] = await pool.query("select * from variables where codigo=?", [codigo]);
        if (!oldPost || oldPost.length ===   0) {
            return res.status(404).json({
                "mensaje": "No se encontró la variable con el código proporcionado."
            });
        }
        
        // Realiza la actualización.
        const [resultado] = await pool.query("update variables set nombre=?, fk_tipo_analisis=?, estado=? where codigo=?", [nombre, fk_tipo_analisis, estado, codigo]);

        if (resultado.affectedRows >   0) {
            res.status(200).json({
                "mensaje": "La variable ha sido actualizada"
            });
        } else {
            res.status(404).json({
                "mensaje": "No se pudo actualizar la variable"
            });
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        });
    }
}

//activar desactivar variables 

export const desactivarVariable = async (req, res) => {
    try {
        const { codigo} = req.body; // Cambiado de 'codigo' a 'codigo'
        const [result] = await pool.query("DELETE FROM variables WHERE codigo = ?", [codigo]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: 'Se desactivó con éxito',
                result: result
            });
        } else {
            res.status(404).json({
                status: 404,
                message: 'No se encontró el registro para desactivar'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}
