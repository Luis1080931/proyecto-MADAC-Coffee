import React, { useRef, useEffect } from 'react';
import { Button, Input, ModalFooter, Select, SelectItem } from '@nextui-org/react';

const FormUsuarios = ({ handleSubmit, actionLabel, selectedUser, mode, onClose }) => {
    const identificacion = useRef(null);
    const nombre = useRef(null);
    const correo = useRef(null);
    const telefono = useRef(null);
    const password = useRef(null);
    const tipo_usuario = useRef(null);

    useEffect(() => {
        if (mode == 'update' && selectedUser) {
            identificacion.current.value = selectedUser.identificacion;
            nombre.current.value = selectedUser.nombre
            correo.current.value = selectedUser.correo_electronico
            telefono.current.value = selectedUser.telefono
            password.current.value = selectedUser.password 
            tipo_usuario.current.value = selectedUser.tipo_usuario

            console.log(selectedUser)
        }
    }, [mode, selectedUser]);
    

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const formData = {
            identificacion: parseInt(identificacion.current.value),
            nombre: nombre.current.value,
            correo_electronico: correo.current.value,
            telefono: telefono.current.value,
            password: password.current.value,
            tipo_usuario: tipo_usuario.current.value
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
                            ref={identificacion} 
                        />
                    </div>
                    <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                        <Input 
                            name='nombre'
                            id='nombre'
                            type="text"
                            placeholder='Ingrese su Nombre(s)'
                            ref={nombre} 
                        />
                    </div>
                    <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                        <Input 
                            name='correo_electronico' 
                            id='correo_electronico'
                            type="text"
                            placeholder='Ingrese su correo Electronico'
                            ref={correo}
                        />
                    </div>
                    <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                        <Input
                            name='telefono' 
                            type="text" 
                            id='telefono' 
                            placeholder='Ingrese su N° de Telefono' 
                            ref={telefono} 
                        />
                    </div>
                    <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                        <Input 
                            type="password"  
                            placeholder='Ingrese la Contraseña'
                            name='password' 
                            id='password' 
                            ref={password} 
                        />
                    </div>
                    <div className='flex w-full flex-wrap md:flex-nowrap mb-4'>
                        <Select  
                        aria-label='Registro de users'
                            name='tipo_usuario' 
                            id='tipo_usuario' 
                            type="text" 
                            placeholder='Ingrese el tipo de usuario' 
                            ref={tipo_usuario}
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
