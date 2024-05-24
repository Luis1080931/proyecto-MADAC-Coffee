import React, { useState, useEffect, useContext } from 'react';
import { Button, Input, ModalFooter, Select, SelectItem } from '@nextui-org/react';
import AuthContext from './../../context/authContext.jsx';

const FormUsuarios = ({ actionLabel, mode, onClose, handleSubmit }) => {
 
    const { idUser} = useContext(AuthContext)
    
    const [formData, setFormData] = useState({
        identificacion: '',
        nombre: '',
        correo_electronico: '',
        telefono: '',
        password: '',
        tipo_usuario: ''
    })

    useEffect(() => {
        if (mode === 'update' && idUser) {
            setFormData({
                identificacion: idUser.identificacion,
                nombre: idUser.nombre,
                correo_electronico: idUser.correo_electronico,
                telefono: idUser.telefono,
                password:  idUser.password,
                tipo_usuario: idUser.tipo_usuario
            })
            
        }
    }, [mode, idUser]);

    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        try {
            const { identificacion, nombre, correo_electronico, telefono, password, tipo_usuario } = formData;
   
            const data = {
                identificacion: parseInt(identificacion),
                nombre,
                correo_electronico: correo_electronico,
                telefono,
                password,
                tipo_usuario
            }
            handleSubmit(data, e )
        } catch (error) {
            console.log('Error' + error);
        }
    };

    return (
        <form method='post' onSubmit={handleFormSubmit}>
                <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                    <Input 
                        name='identificacion'
                        id='identificacion'
                        type="number"
                        placeholder='Ingrese su N° de identidad'
                        value={formData.identificacion}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                    <Input 
                        name='nombre'
                        id='nombre'
                        type="text"
                        placeholder='Ingrese su Nombre(s)'
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                    <Input 
                        name='correo_electronico' 
                        id='correo_electronico'
                        type="text"
                        placeholder='Ingrese su correo Electronico'
                        value={formData.correo_electronico}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                    <Input
                        name='telefono' 
                        type="text" 
                        id='telefono' 
                        placeholder='Ingrese su N° de Telefono' 
                        value={formData.telefono}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                    <Input 
                        type="password"  
                        placeholder='Ingrese la Contraseña'
                        name='password' 
                        id='password' 
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                    <select  
                        name='tipo_usuario'
                        className='w-[400px] rounded-xl bg-gray-100 h-[40px]'
                        aria-label='Registro de users'
                        placeholder='Ingrese el tipo de usuario' 
                        value={formData.tipo_usuario}
                        onChange={handleChange}
                    >
                        <option value='admin'> Admin </option>
                        <option value="catador"> Catador </option>
                        <option value="caficultor"> Caficultor </option>
                    </select>
                </div>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                        Cerrar
                    </Button>
                    <Button type='submit' color="primary">
                        {actionLabel}
                    </Button>
                </ModalFooter>
        </form>
    )
}

export default FormUsuarios;
