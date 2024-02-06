import { pool} from "../database/conexion"

export const ListarVariables = async(req,res) => {
    try{
        const [resultado]  = await pool.query('SELECT * FROM variables');

        if (resultado.length > 0) {
            res.status(200).json(resultado)
        }else {
            res.status(404).json({
                "message":'No se encontraron variables'
            })
        }
    }catch (error){
        res.status(500).json({msg: 'Error en el servidor'})
    }
}

export  const CrearVariable = async(req,res)=>{

    const {nombre,fk_tipo_analisis,estado}= req.body;
    

};



