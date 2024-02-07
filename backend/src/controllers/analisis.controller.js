import { pool } from '../database/conexion.js'
/*
    * X Registrar // POST
    * X Editar // PUT
    * X Desactivar // POST
*/


export const registrarAnalisis = async (req, res) => {
    try {
        const { fecha, analista, fk_muestra, fk_tipo_analisis, estado } = req.body
        const [ resultado ] = await pool.query("INSERT INTO analisis(fecha, analista, fk_muestra, fk_tipo_analisis, estado) VALUES (?, ?, ?, ?, ?)", [fecha, analista, fk_muestra, fk_tipo_analisis, estado])

        // 0 = No afecto nada
        // 1, 2, 3 = Que hizo algo en la base de datos
        if (resultado.affectedRows > 0) {
            res.status(201).json({
                "mensaje": "Analisis creado con exito!!!!!"
            })
        } else {
            res.status(404).json({
                "mensaje": "No se pudo crear el analisis :c"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

export const editarAnalisis = async (req, res) => {
    try {
        const { codigo } = req.params
        const { fecha, analista, fk_muestra, fk_tipo_analisis, estado } = req.body
        
        const [ analisisPasado ] = await pool.query("select * from analisis where codigo=?", [codigo])
        const [ resultado ] = await pool.query(`update analisis set 
                                                fecha='${fecha ? fecha : analisisPasado[0].fecha}', 
                                                analista='${analista ? analista : analisisPasado[0].analista}', 
                                                fk_muestra=${fk_muestra ? fk_muestra : analisisPasado[0].fk_muestra}, 
                                                fk_tipo_analisis=${fk_tipo_analisis ? fk_tipo_analisis : analisisPasado[0].fk_tipo_analisis}, 
                                                estado='${estado ? estado : analisisPasado[0].estado}' where codigo=? `, [codigo])

        if (resultado.affectedRows > 0) {
            res.status(201).json({
                "mensaje": "Analisis editado con exito!!!!!"
            })
        } else {
            res.status(404).json({
                "mensaje": "No se puedo editar el analisis"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}


export const desactivarAnalisis = async (req, res) => {
    try {
        const { codigo } = req.params
        const [ resultado ] = await pool.query("update analisis set estado='inactivo' where codigo=?", [codigo])

        if (resultado.affectedRows > 0) {
            res.status(201).json({
                "mensaje": "Analisis desactivado con exito!"
            })
        } else {
            res.status(404).json({
                "mensaje": "No se puedo desactivar el analisis"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}