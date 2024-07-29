
import { pool } from "../database/conexion.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

export const validar = async (req, res) => {

    try {

        let {correo_electronico, password} = req.body
        let sql = `SELECT identificacion, nombre, telefono, tipo_usuario, correo_electronico, password, estado FROM usuarios WHERE correo_electronico='${correo_electronico}' and password='${password}'`

        const [user] = await pool.query(sql)

        if(user.length>0){
            let token = jwt.sign({user}, process.env.AUT_SECRET, {expiresIn:process.env.AUT_EXPIRE})

            return res.status(200).json({ 'user':user,'token':token})
        }else{
            res.status(404).json({'status': 404, 'message': 'Usuario no autorizado'})
        }

    } catch (error) {
        res.status(500).json({status: 500, message: 'Error del servidor' + error})
    }
    
}

export const validarToken = async (req, res, next) => {

    try {
        
        let tokenClient = req.headers['token']

        if(!tokenClient){
            return res.status(403).json({'message': 'Token es requerido'})
        }else{
            const token = jwt.verify(tokenClient, process.env.AUT_SECRET, (error, decoded) => {
                if(error){
                    return res.status(403).json({message: 'Token es obligatorio'})
                }else{
                    next()
                }
            })
        }

    } catch (error) {
        return res.status(500).json({status: 500, message: 'Error del servidor' + error})
    }
    
}

export const tokenPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const sql = `SELECT * FROM usuarios WHERE correo_electronico = '${email}'`;
        const [user] = await pool.query(sql);
        
        if (!user[0].correo_electronico) {
            return res.status(404).json({ message: "Correo del usuario no definido" });
        }else if (user.length > 0) {
            const token = jwt.sign({ identificacion: user[0].identificacion}, "estemensajedebeserlargoyseguro", { expiresIn: "2h" });
            console.log(token);

            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "madaccoffee@gmail.com",
                    pass: "alkp fmcf kcxx rhca" 
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            const mailOptions = {
                from: "madaccoffee@gmail.com",
                to: user[0].email_user,
                subject: "Restablecer Contraseña SubCoffee",
                html: `
                    <p>Querido Usuario,</p>
                    <p>Para restablecer tu contraseña, haz clic en el siguiente botón:</p>
                    <a href="http://localhost:5173/reset-password?token=${token}" style="background-color: #39A900; color: white;
                    padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; border-radius: 5px;">Restablecer Contraseña</a>
                    <p>Si no solicitaste un cambio de contraseña, por favor ignora este correo.</p>
                    <p>Saludos,<br>El equipo de SubCoffee</p>
                    <br>
                    <img src="cid:logoProyecto" alt="MADAC-COFFEE" style="width: 100px; height: auto;">
                    <img src="cid:logo_sena" alt="SENA" style="width: 100px; height: auto;">
                `,
                attachments: [{
                    filename: 'logoProyencto.png',
                    path: './public/logoProyencto.png',
                    cid: 'logoProyecto'
                }, {
                    filename: 'logoSena.png',
                    path: './public/logoSena.png',
                    cid: 'logo_sena'
                }]};
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({ message: "No se pudo enviar el Correo" });
                }
                res.send({
                    message: "Hemos enviado una notificación a tu cuenta de Gmail. Por favor, revisa tu bandeja de entrada y sigue las instrucciones proporcionadas para restablecer tu contraseña."
                });
            });
        } else {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" + error });
    }
};

export const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, "estemensajedebeserlargoyseguro");
        const userId = decoded.identificacion; 

        // Consultar el usuario por su ID
        const sql = "SELECT * FROM usuarios WHERE identificacion = ?";
        const [usuario] = await pool.query(sql, [userId]);

        if (usuario.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const sqlUpdate = "UPDATE usuarios SET password = ? WHERE identificacion = ?";
        const [actualizar] = await pool.query(sqlUpdate, [hashedPassword, userId]);

        if (actualizar.affectedRows > 0) {
            return res.status(200).json({ message: "Contraseña actualizada" });
        } else {
            return res.status(404).json({ message: "No se pudo actualizar la contraseña" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error en el servidor" + error });
    }
};