import React, { useRef } from 'react'
import { Button } from '../atoms/Button'
import axios from 'axios';

const token = localStorage.getItem('token')
const baseURL = "http://localhost:3000/usuarios/registrar";

const FormUsuarios = ({ handleSubmit, actionLabel }) => {

    const identificacion = useRef(null);
    const nombre = useRef(null);
    const correo_electronico= useRef(null);
    const telefono=useRef(null);
    const password=useRef(null);
    const tipo_usuario=useRef(null);

    const handle = async (e)=>{
        e.preventDefault();
        try {
            const data ={
                identificacion:parseInt(identificacion.current.value),
                nombre:nombre.current.value,
                correo_electronico:correo_electronico.current.value,
                telefono:telefono.current.value,
                password:password.current.value,
                tipo_usuario:tipo_usuario.current.value
            }
            const response = await axios.post(baseURL,data,{headers: {token:token}})

            console.log(response);
            if (response.status === 200 || response.status === 201) {
                alert('USUARIO REGISTRADO CON ÉXITO');
            } else {
                alert('NO SE PUDO REGISTRAR EL USUARIO');
            }
        } catch (error) {
            console.log(error);
            alert('Hay un error en el sistema ' + error);
        }
    }

  return (
    <>
    <form method='post' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
            <div className='flex flex-col'>
                <label className='text-xl font-bold'> Numero de documento </label>
                <input className='p-2 rounded-lg w-80 h-12' name='identificacion' id='identificacion' type="number" placeholder='Ingrese su N° de identidad' />
            </div>
            <div className='flex-col md:flex'  >
                <label className='text-xl font-bold'> Nombre: </label>
                <input className='p-2 rounded-lg w-80 h-12' name='nombre' id='nombre' type="text" placeholder='Ingrese su Nombre(s)' />
            </div>
            <div className='flex-col md:flex'  >
                <label className='text-xl font-bold'> Correo: </label>
                <input className='p-2 rounded-lg w-80 h-12' name='correo_electronico' id='correo_electronico' type="text" placeholder='Ingrese su correo Electronico' />
            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Telefono: </label>
                <input className='p-2 rounded-lg w-80 h-12' name='telefono' type="text" id='telefono' placeholder='Ingrese su N° de Telefono' />
            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Contraseña: </label>
                <input className='p-2 rounded-lg w-80 h-12' type="password"  placeholder='Ingrese la Contraseña' name='password' id='password'/>
            </div>
            <div className='flex-col md:flex'>
                <label className='text-xl font-bold'> Tipo de Usuario: </label>
                <input className='p-2 rounded-lg w-80 h-12' name='tipo_usuario' id='tipo_usuario' type="text" placeholder='Ingrese el tipo de usuario' />
            </div>
            <Button actionLabel={actionLabel} />
        </div>
    </form>
    </>
  )
}

export default FormUsuarios