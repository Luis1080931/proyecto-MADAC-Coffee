import React, { useRef, useEffect } from 'react';
import { Button } from '../atoms/Button';
import axios from 'axios';

const baseURL = "http://localhost:3000/usuarios/registrar";

const FormUsuarios = ({ handleSubmit, actionLabel, selectedUser }) => {
    const identificacionRef = useRef(null);
    const nombreRef = useRef(null);
    const correoRef = useRef(null);
    const telefonoRef = useRef(null);
    const passwordRef = useRef(null);
    const tipoUsuarioRef = useRef(null);

    useEffect(() => {
        if (selectedUser) {
            identificacionRef.current.value = selectedUser.identificacion || '';
            nombreRef.current.value = selectedUser.nombre || '';
            correoRef.current.value = selectedUser.correo_electronico || '';
            telefonoRef.current.value = selectedUser.telefono || '';
            passwordRef.current.value = selectedUser.password || '';
            tipoUsuarioRef.current.value = selectedUser.tipo_usuario || '';

            console.log(selectedUser)
            // Continúa llenando los campos restantes según sea necesario
        }
    }, [selectedUser]);
    

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = {
            identificacion: parseInt(identificacionRef.current.value),
            nombre: nombreRef.current.value,
            correo_electronico: correoRef.current.value,
            telefono: telefonoRef.current.value,
            password: passwordRef.current.value,
            tipo_usuario: tipoUsuarioRef.current.value
        };
        handleSubmit(formData, e); // Pasa los datos del formulario al manejador de envío del formulario de la vista principal
    };

    return (
        <>
            <form method='post' onSubmit={handleFormSubmit}>
                <div className='flex flex-col'>
                    <div className='flex flex-col'>
                        <label className='text-xl font-bold'> Numero de documento </label>
                        <input className='p-2 rounded-lg w-80 h-12' name='identificacion' id='identificacion' type="number" placeholder='Ingrese su N° de identidad' ref={identificacionRef} />
                    </div>
                    <div className='flex-col md:flex'  >
                        <label className='text-xl font-bold'> Nombre: </label>
                        <input className='p-2 rounded-lg w-80 h-12' name='nombre' id='nombre' type="text" placeholder='Ingrese su Nombre(s)' ref={nombreRef} />
                    </div>
                    <div className='flex-col md:flex'  >
                        <label className='text-xl font-bold'> Correo: </label>
                        <input className='p-2 rounded-lg w-80 h-12' name='correo_electronico' id='correo_electronico' type="text" placeholder='Ingrese su correo Electronico' ref={correoRef} />
                    </div>
                    <div className='flex-col md:flex'>
                        <label className='text-xl font-bold'> Telefono: </label>
                        <input className='p-2 rounded-lg w-80 h-12' name='telefono' type="text" id='telefono' placeholder='Ingrese su N° de Telefono' ref={telefonoRef} />
                    </div>
                    <div className='flex-col md:flex'>
                        <label className='text-xl font-bold'> Contraseña: </label>
                        <input className='p-2 rounded-lg w-80 h-12' type="password"  placeholder='Ingrese la Contraseña' name='password' id='password' ref={passwordRef} />
                    </div>
                    <div className='flex-col md:flex'>
                        <label className='text-xl font-bold'> Tipo de Usuario: </label>
                        <select className='p-2 rounded-lg w-80 h-12' name='tipo_usuario' id='tipo_usuario' type="text" placeholder='Ingrese el tipo de usuario' ref={tipoUsuarioRef}>
                            <option value="catador"> Catador </option>
                            <option value="caficultor"> Caficultor </option>
                        </select>
                    </div>
                    <Button actionLabel={actionLabel} />
                </div>
            </form>
        </>
    )
}

export default FormUsuarios;
