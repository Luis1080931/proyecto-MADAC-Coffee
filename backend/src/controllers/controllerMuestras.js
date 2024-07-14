import {pool} from "../database/conexion.js"
import { validationResult } from 'express-validator';
//1 listar
export const listarMuestras = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM muestras")

        if (result.length > 0 ) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                "Mensaje":"No hay muestras"
            });
        }
    } catch (error) {
        res.status(500).json({message:"Error en el servidor" + error})
    }
}

//2 crear muestras 

export const CrearMuestra = async (req, res) => {
    try {
        // Validación de datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

        const { fecha, tipo_molienda, densidad_cafe, proceso_fermentacion, tipo_tostion, altura_MSNM, tiempo_fermentacion, actividad_agua, tiempo_secado,presentacion, fk_lote } = req.body;
        const [resultado] = await pool.query("INSERT INTO muestras (fecha, tipo_molienda, densidad_cafe, proceso_fermentacion, tipo_tostion, altura_MSNM, tiempo_fermentacion, actividad_agua, tiempo_secado,presentacion, fk_lote, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)", [fecha, tipo_molienda, densidad_cafe, proceso_fermentacion, tipo_tostion, altura_MSNM, tiempo_fermentacion, actividad_agua, tiempo_secado, presentacion, fk_lote]);

        if (resultado.affectedRows > 0) {
            res.status(200).json({ message: "Se creó una muestra" });
        } else {
            res.status(403).json({ message: "No se creó una muestra" });
        }
    } catch (error) {
        // Manejo de errores generales
        res.status(500).json({ message: "Error en el servidor: " + error });
    }
};



//3 actualizar muestra
export const actualizarMuestra = async (req, res) => {
    try {
        // Validación de datos
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
    
        const { codigo } = req.params;
        const { fecha, tipo_molienda, densidad_cafe, proceso_fermentacion, tipo_tostion, altura_MSNM, tiempo_fermentacion, actividad_agua, tiempo_secado,presentacion, fk_lote } = req.body;

        const [result] = await pool.query('UPDATE muestras SET fecha = IFNULL(?, fecha), tipo_molienda = IFNULL(?, tipo_molienda), densidad_cafe = IFNULL(?, densidad_cafe), proceso_fermentacion = IFNULL(?, proceso_fermentacion), tipo_tostion = IFNULL(?, tipo_tostion), altura_MSNM = IFNULL(?, altura_MSNM), tiempo_fermentacion = IFNULL(?, tiempo_fermentacion), actividad_agua = IFNULL(?, actividad_agua), tiempo_secado = IFNULL(?, tiempo_secado), presentacion = IFNULL(?, presentacion) , fk_lote = IFNULL(?, fk_lote), estado=1 WHERE codigo = ?', [fecha, tipo_molienda, densidad_cafe, proceso_fermentacion, tipo_tostion, altura_MSNM, tiempo_fermentacion, actividad_agua, tiempo_secado, presentacion, fk_lote, codigo]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'La muestra ha sido actualizada correctamente.' });
        } else {
            res.status(400).json({ message: 'No se pudo actualizar la muestra. Por favor, verifica los datos proporcionados.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Error en el servidor" + error})
    }
};



//4 desactivar muestras}

export const desactivarMuestras = async (req, res) => {
    try {
        const { codigo } = req.params;
        const [result] = await pool.query("UPDATE muestras SET estado = 2 WHERE codigo = ?", [codigo]);

        if (result.affectedRows >  0) {
            res.status(200).json({
                status:  200,
                message: 'Se desactivó con éxito',
            });
        } else {
            res.status(403).json({
                status:  403,
                message: 'No se pudo desactivar la muestra'
            });
        }
    } catch (error) {
        res.status(500).json({message:"Error en el servidor" + error})
    }
};
//5 activar
export const activarMuestras = async (req, res) => {
    try {
        const { codigo } = req.params;
        const [result] = await pool.query("UPDATE muestras SET estado = 1 WHERE codigo = ?", [codigo]);

        if (result.affectedRows > 0) {
            res.status(200).json({
                status: 200,
                message: 'Se activó con éxito la muestra',
            });
        } else {
            res.status(404).json({
                status: 404,
                message: 'No se pudo activar la muestra'
            });
        }
    } catch (error) {
        res.status(500).json({message: "Error en el servidor" + error})
    }
};

//6 buscar
export const BuscarMuestra = async (req, res) => {
    try {
        const {codigo} = req.params; //esta es la caracterica
        let sql = (`SELECT * FROM muestras WHERE codigo = ?`)
        const [result] = await pool.query(sql, [codigo]);
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
        res.status(500).json({message:"Error en el servidor" + error})
    }
}
//7 muestras activas
export const muestrasActivas = async (req, res) => {
    try {
        const [result] = await pool.query("SELECT * FROM muestras WHERE estado = 1")

        if (result.length > 0 ) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                status: 404,
                "Mensaje":"No hay muestras"
            });
        }
    } catch (error) {
        res.status(500).json({message:"Error en el servidor" + error})
    }
}
/* controler  */
export const muestrasTable = async (req, res) => {
    try {
        let sql = `
        SELECT 
<<<<<<< HEAD
            m.*
=======
            m.*,
            c.nombre, 
            f.nombre_finca
>>>>>>> 35b79d311e3ddee305816e4c1a1145a95e0ef90d
        FROM 
            muestras m
        JOIN lotes l ON m.fk_lote = l.codigo
        JOIN fincas f ON l.fk_finca = f.codigo
        JOIN usuarios c ON f.fk_caficultor = c.identificacion`

        const [result] = await pool.query(sql)

        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(404).json({
                "Mensaje": "No hay muestras"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Error en el servidor' + error
        })
    }
}
