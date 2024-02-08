import {pool} from '../database/conexion.js'

export const getLotes=async(req,res)=>{
    const [rows]=await pool.query('SELECT * FROM lotes')
    res.json(rows)
}
export const getLote=async(req,res)=>{
    const [rows] =await pool.query('SELECT * FROM lotes WHERE codigo=?',[req.params.codigo])
    console.log(rows)
    /*el if rows es para verificar si alguna tabla se vio afectada si en el caso que sea cero lanzar el mensaje */
    if(rows.length<=0)return res.status(404).json({
        message:'lote de caficultor no encontrado'
    })
    res.json(rows[0])
}
export const postLotes=async(req,res)=>{
    /*en el caso que el codigo sea autoincrement no se coloca es esta constante */
    const {numero_arboles,fk_finca,fk_variedad,estado}=req.body
    const [rows]=await pool.query('INSERT INTO lotes (numero_arboles,fk_finca,fk_variedad,estado) VALUES(?,?,?,?)',[numero_arboles,fk_finca,fk_variedad,estado])
    res.send({
        codigo:rows.insertId,
        numero_arboles,
        fk_finca,
        fk_variedad,
        estado,
    })
}
export const activar_desactivar_Lotes=async(req,res)=>{
    const {codigo}=req.params
    const {estado}=req.body

    const [result]=await pool.query('UPDATE lotes SET estado=IFNULL(?,estado) WHERE codigo=?',[estado,codigo])
    if(result.affectedRows === 0)return res.status(404).json({
        message:'no se a encontrado el lote'
    })
    const [rows]=await pool.query('SELECT * FROM lotes WHERE codigo = ?',[codigo])
    res.json(rows[0])
}

export const actualizarLotes =async(req,res)=>{
    const{codigo}=req.params
    const{numero_arboles,fk_finca,fk_variedad}=req.body
    const [result]=await pool.query('UPDATE lotes SET numero_arboles=IFNULL(?,numero_arboles),fk_finca=IFNULL(?,fk_finca),fk_variedad=IFNULL(?,fk_variedad) WHERE codigo=?',[numero_arboles,fk_finca,fk_variedad,codigo])
    if(result.affectedRows === 0)return res.status(404).json({
        message:'lote no encontrado'
    })
    const [rows]=await pool.query('SELECT * FROM lotes WHERE codigo=?',[codigo])
    res.json(rows[0])
}