import { pool } from '../database/conexion.js'
/*
    * X Registrar // POST
    * X Editar // PUT
    * X Desactivar // POST
*/

//Registrar
export const registrarAnalisis = async (req, res) => {
    try {
        const { fecha, analista, fk_muestra, fk_tipo_analisis, estado } = req.body
        const [ resultado ] = await pool.query("INSERT INTO analisis(fecha, fk_analista, fk_muestra, fk_tipo_analisis, estado) VALUES (?, ?, ?, ?, ?)", [fecha, analista, fk_muestra, fk_tipo_analisis, estado])

        // 0 = No afecto nada
        // 1, 2, 3 = Que hizo algo en la base de datos
        if (resultado.affectedRows > 0) {
            res.status(201).json({
                "mensaje": "Analisis creado con exito!"
            })
        } else {
            res.status(403).json({
                "mensaje": "No se pudo crear el analisis"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}

//Actualizar
export const actualizarAnalisis = async (req, res) => {
    try {
        const { codigo } = req.params
        const { fecha, fk_analista, fk_muestra, fk_tipo_analisis, estado } = req.body
        
        const[resultado] = await pool.query(`UPDATE analisis SET fecha=IFNULL(?,fecha), fk_analista=IFNULL(?,fk_analista), fk_muestra=IFNULL(?,fk_muestra), fk_tipo_analisis=IFNULL(?,fk_tipo_analisis), estado=IFNULL(?,estado) WHERE codigo= ?`,[fecha, fk_analista, fk_muestra, fk_tipo_analisis, estado, codigo]);

        if (resultado.affectedRows > 0) {
            res.status(201).json({
                "mensaje": "Analisis actualizado con exito!"
            })
        } else {
            res.status(403).json({
                "mensaje": "No se pudo actualizar el analisis"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Error del servidor" + error
        })
    }
}

//Desactivar
export const desactivarAnalisis = async (req, res) => {
    try {
        const { codigo } = req.params
        const [ resultado ] = await pool.query("update analisis set estado='inactivo' where codigo=?", [codigo])

        if (resultado.affectedRows > 0) {
            res.status(201).json({
                "mensaje": "Analisis desactivado con exito!"
            })
        } else {
            res.status(403).json({
                "mensaje": "No se pudo desactivar el analisis"
            })
        }

    } catch (error) {
        res.status(500).json({
            "mensaje": error
        })
    }
}
//Listar
export const listarAnalisis=async(req,res)=>{
    try {

        const [analisis] = await pool.query("SELECT * FROM analisis")

        if (analisis.length>0) {
            res.status(200).json({analisis})
        } else {
        res.status(404).json({
            "mensaje":"No hay analisis registrados"
        })
        }
        
        
    } catch (error) {
        res.status(500).json({
            message: "Error del servidor" + error
        })
    }
}
//Buscar
export const buscarAnalisis=async(req,res)=>{
    try {

        const {codigo} =req.params

        const [analisis] =await pool.query("SELECT * FROM analisis where codigo = ?",[codigo])
        
        if (analisis.length>0) {
            res.status(200).json(analisis)
        } else {
            res.status(404).json({
                "mensaje":"El analisis no existe"
            })
        }
    } catch (error) {
        res.status(500).json({
            "mensaje":error
        })
    }
}