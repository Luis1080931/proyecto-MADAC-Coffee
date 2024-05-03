import React, { useRef, useEffect } from 'react';
import { Button, Input, ModalFooter, Select, SelectItem } from '@nextui-org/react';

const FormUsuarios = ({ handleSubmit, actionLabel, selectedUser, mode, onClose }) => {
    const identificacionRef = useRef(null);
    const nombreRef = useRef(null);
    const correoRef = useRef(null);
    const telefonoRef = useRef(null);
    const passwordRef = useRef(null);
    const tipoUsuarioRef = useRef(null);

    useEffect(() => {
        if (mode == 'update' && selectedUser) {
            identificacionRef.current.value = selectedUser.identificacion || '';
            nombreRef.current.value = selectedUser.nombre || '';
            correoRef.current.value = selectedUser.correo_electronico || '';
            telefonoRef.current.value = selectedUser.telefono || '';
            passwordRef.current.value = selectedUser.password || '';
            tipoUsuarioRef.current.value = selectedUser.tipo_usuario || '';

            console.log(selectedUser)
        }
    }, [mode, selectedUser]);
    

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
        handleSubmit(formData, e);
    };

    return (
        <>
            <form method='post' onSubmit={handleFormSubmit}>
                <div>
                    <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                        <Input 
                            name='identificacion'
                            id='identificacion'
                            type="number"
                            placeholder='Ingrese su N° de identidad'
                            ref={identificacionRef} 
                        />
                    </div>
                    <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                        <Input 
                            name='nombre'
                            id='nombre'
                            type="text"
                            placeholder='Ingrese su Nombre(s)'
                            ref={nombreRef} 
                        />
                    </div>
                    <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                        <Input 
                            name='correo_electronico' 
                            id='correo_electronico'
                            type="text"
                            placeholder='Ingrese su correo Electronico'
                            ref={correoRef}
                        />
                    </div>
                    <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                        <Input
                            name='telefono' 
                            type="text" 
                            id='telefono' 
                            placeholder='Ingrese su N° de Telefono' 
                            ref={telefonoRef} 
                        />
                    </div>
                    <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                        <Input 
                            type="password"  
                            placeholder='Ingrese la Contraseña'
                            name='password' 
                            id='password' 
                            ref={passwordRef} 
                        />
                    </div>
                    <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                        <Select  
                        aria-label='Registro de users'
                            name='tipo_usuario' 
                            id='tipo_usuario' 
                            type="text" 
                            placeholder='Ingrese el tipo de usuario' 
                            ref={tipoUsuarioRef}
                        >
                            <SelectItem value="catador"> Catador </SelectItem>
                            <SelectItem value="caficultor"> Caficultor </SelectItem>
                        </Select>
                    </div>
                    {<ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                        </Button>
                        <Button type='submit' color="primary">
                        {actionLabel}
                        </Button>
                    </ModalFooter>}
                </div>
            </form>
        </>
    )
}

export default FormUsuarios;
