import { pool } from '../database/conexion.js'

export const registrarVariedades = async (req, res) => {
    try {
        const { nombre, estado } = req.body
        const [ resultado ] = await pool.query("INSERT INTO variedades(nombre, estado) VALUES (?, ?)", [nombre, estado])

        
        if (resultado.affectedRows > 0) {
            res.status(201).json({
                "mensaje": "¡(Variedades) creado con exito!"
            })
        } else {
            res.status(404).json({
                "mensaje": "No se pudo crear (Variedades)"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

export const editarVariedades = async (req, res) => {
    try {
        const { codigo } = req.params
        const { nombre, estado } = req.body
        
        const [ variedadesPasado ] = await pool.query("select * from variedades where codigo=?", [codigo])
        const [ resultado ] = await pool.query(`update variedades set 
                                            nombre='${nombre ? nombre : variedadesPasado[0].nombre}', 
                                            estado='${estado ? estado : variedadesPasado[0].estado}' where codigo=? `, [codigo])

        if (resultado.affectedRows > 0) {
            res.status(201).json({
                "mensaje": "(Variedades) editado con exito"
            })
        } else {
            res.status(404).json({
                "mensaje": "No se puedo editar (Variedades)"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}


export const desactivarVariedades = async (req, res) => {
    try {
        const { codigo } = req.params
        const [ resultado ] = await pool.query("update variedades set estado='inactivo' where codigo=?", [codigo])

        if (resultado.affectedRows > 0) {
            res.status(201).json({
                "mensaje": "(Variedades) desactivado con exito"
            })
        } else {
            res.status(404).json({
                "mensaje": "No se puedo desactivar (Variedades)"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}