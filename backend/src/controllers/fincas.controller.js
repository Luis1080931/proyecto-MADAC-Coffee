import {pool} from '../database/conexion.js'

export const getFincas=async(req,res)=>{
    const [rows]=await pool.query('SELECT * FROM fincas')
    res.json(rows)
}
export const getFinca = async (req,res)=>{
    const [rows]=await pool.query('SELECT * FROM fincas WHERE codigo=?',[req.params.codigo])
    console.log(rows)
    if(rows.length<=0)return res.status(404).json({
            message:'finca del caficultor no encontrada'
    })
    res.json(rows[0])
}
export const postFincas=async(req,res)=>{
    const {dimension_mt2,fk_caficultor,municipio,vereda,estado}=req.body
    const [rows]=await pool.query('INSERT INTO fincas (dimension_mt2,fk_caficultor,municipio,vereda,estado) VALUES (?,?,?,?,?)',[dimension_mt2,fk_caficultor,municipio,vereda,estado])
    /*el rows significa que solo esta pidiendo las filas ya que si no estuviera nos daria todo el codigo  */
    /*res.send es para que nos muestren los datos*/
    res.send({
        codigo:rows.insertId,
        dimension_mt2,
        fk_caficultor,
        municipio,
        vereda,
        estado,
    })
}
export const activar_desactivar_Fincas=async(req,res)=>{
    const {codigo}=req.params
    const {estado}=req.body

    const [result]=await pool.query('UPDATE fincas SET estado=IFNULL(?,estado) WHERE codigo=?',[estado,codigo])
    if(result.affectedRows === 0)return res.status(404).json({
        message:'no se a encontrado la finca'
    })
    const [rows]=await pool.query('SELECT * FROM fincas WHERE codigo = ?',[codigo])
    res.json(rows[0])
}

export const actualizarFincas = async(req,res)=>{
    const {codigo}=req.params
    const {dimension_mt2,fk_caficultor,municipio,vereda}=req.body

    const[result]=await pool.query('UPDATE fincas SET dimension_mt2=IFNULL(?,dimension_mt2),fk_caficultor=IFNULL(?,fk_caficultor),municipio=IFNULL(?,municipio),vereda=IFNULL(?,vereda) WHERE codigo=?',[dimension_mt2,fk_caficultor,municipio,vereda,codigo])

    if(result.affectedRows === 0)return res.status(404).json({
        message:'no pudimos actualizar la fincas'
    })
    const [rows]=await pool.query('SELECT * FROM fincas WHERE codigo = ?',[codigo])
    res.json(rows[0])
}
