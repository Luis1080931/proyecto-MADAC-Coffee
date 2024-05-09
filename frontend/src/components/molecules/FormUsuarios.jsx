import React, { useState, useEffect } from 'react';
import { Button, Input, ModalFooter, Select, SelectItem } from '@nextui-org/react';

const FormUsuarios = ({ handleSubmit, actionLabel, selectedUser, mode, onClose }) => {
 
    const [identificacion, setIdentificacion] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('');

    useEffect(() => {
        if (mode === 'update' && selectedUser) {
            console.log(selectedUser.tipo_usuario);
            setIdentificacion(selectedUser.identificacion);
            setNombre(selectedUser.nombre);
            setCorreo(selectedUser.correo_electronico);
            setTelefono(selectedUser.telefono);
            setPassword(selectedUser.password);
            setTipoUsuario(selectedUser.tipoUsuario);
            
        }
    }, [selectedUser]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = {
            identificacion: parseInt(identificacion),
            nombre,
            correo_electronico: correo,
            telefono,
            password,
            tipo_usuario: tipoUsuario
        };
        handleSubmit(formData, e);
    };

    return (
        <form method='post' onSubmit={handleFormSubmit}>
                <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                    <Input 
                        name='identificacion'
                        id='identificacion'
                        type="number"
                        placeholder='Ingrese su N° de identidad'
                        value={identificacion}
                        onChange={(e) => setIdentificacion(e.target.value)}
                    />
                </div>
                <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                    <Input 
                        name='nombre'
                        id='nombre'
                        type="text"
                        placeholder='Ingrese su Nombre(s)'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                    <Input 
                        name='correo_electronico' 
                        id='correo_electronico'
                        type="text"
                        placeholder='Ingrese su correo Electronico'
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                </div>
                <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                    <Input
                        name='telefono' 
                        type="text" 
                        id='telefono' 
                        placeholder='Ingrese su N° de Telefono' 
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                    />
                </div>
                <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                    <Input 
                        type="password"  
                        placeholder='Ingrese la Contraseña'
                        name='password' 
                        id='password' 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                    <Select  
                        aria-label='Registro de users'
                        placeholder='Ingrese el tipo de usuario' 
                        value={tipoUsuario}
                        onChange={(e) => setTipoUsuario(e.target.value)}
                    >
                        <SelectItem value="catador"> Catador </SelectItem>
                        <SelectItem value="caficultor"> Caficultor </SelectItem>
                    </Select>
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
