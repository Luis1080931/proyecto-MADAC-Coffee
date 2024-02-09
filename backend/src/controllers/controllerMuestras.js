import {pool} from "../database/conexion.js"

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
        res.status(500).json({"Mensaje": error})
    }
}

//crear muestras 

 
export const CrearMuestra = async (req, res) => {
    try {
        const { fecha, cantidad, quien_recibe, proceso_fermentacion, humedad_cafe, altura_MSNM, tipo_secado, observaciones, fk_lote, estado } = req.body;

        const [resultado] = await pool.query("INSERT INTO muestras (fecha, cantidad, quien_recibe, proceso_fermentacion, humedad_cafe, altura_MSNM, tipo_secado, observaciones, fk_lote, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [fecha, cantidad, quien_recibe, proceso_fermentacion, humedad_cafe, altura_MSNM, tipo_secado, observaciones, fk_lote, estado]);

        if (resultado.affectedRows >  0) {
            res.status(200).json({ mensaje: "Se creó una muestra" });
        } else {
            res.status(404).json({ mensaje: "No se creó una muestra" });
        }
    } catch (error) {
        res.status(500).json({ mensaje: error.message || "Error interno del servidor" });
    }
};

//actualizar muestra
export const actualizarMuestra = async (req, res) => {
    try {
        const { codigo } = req.params;
        const { fecha, cantidad, quien_recibe, proceso_fermentacion, humedad_cafe, altura_MSNM, tipo_secado, observaciones, fk_lote } = req.body;

        // La consulta debe tener placeholders para cada valor que se va a actualizar
        const [result] = await pool.query('UPDATE muestras SET fecha = IFNULL(?, fecha), cantidad = IFNULL(?, cantidad), quien_recibe = IFNULL(?, quien_recibe) , proceso_fermentacion = IFNULL(?, proceso_fermentacion), humedad_cafe = IFNULL(?, humedad_cafe), altura_MSNM = IFNULL(?, altura_MSNM), tipo_secado = IFNULL(?, tipo_secado), observaciones = IFNULL(?, observaciones), fk_lote = IFNULL(?, fk_lote) WHERE codigo = ?', [fecha, cantidad, quien_recibe, proceso_fermentacion, humedad_cafe, altura_MSNM, tipo_secado, observaciones, fk_lote, codigo]);

        if (result.affectedRows >  0) {
            res.status(200).json({ message: 'La muestra ha sido actualizada correctamente.' });
        } else {
            res.status(400).json({ message: 'No se pudo actualizar la muestra. Por favor, verifica los datos proporcionados.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al intentar actualizar la muestra. Por favor, inténtalo de nuevo más tarde.' });
    }
};


// desactivar muestras}

export const desactivarMuestras = async (req, res) => {
    try {
        const { codigo } = req.params; // Corregido de 'codigo' a 'codigo'
        const {estado} = req.body
        const [result] = await pool.query("UPDATE muestras SET estado = ? WHERE codigo = ?", [estado, codigo]);

        if (result.affectedRows >  0) {
            res.status(200).json({
                status:  200,
                message: 'Se desactivó con éxito',
                result: result
            });
        } else {
            res.status(404).json({
                status:  404,
                message: 'No se encontró el registro para desactivar'
            });
        }
    } catch (error) {
        res.status(500).json({
            status:  500,
            message: error.message
        });
    }
};
