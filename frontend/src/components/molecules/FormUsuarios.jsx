import React, { useRef, useEffect } from 'react';
import { ModalFooter, Button } from "@nextui-org/react";
import axios from 'axios';

const baseURL = "http://localhost:3000/usuarios/registrar";

const FormUsuarios = ({ mode, handleSubmit, initialData, onClose, actionLabel }) => {
    const identificacionRef = useRef(null);
    const nombreRef = useRef(null);
    const correoRef = useRef(null);
    const telefonoRef = useRef(null);
    const passwordRef = useRef(null);
    const tipoUsuarioRef = useRef(null);

    useEffect(() => {
        if (mode === 'update' && initialData) {
            identificacionRef.current.value = initialData.identificacion || '';
            nombreRef.current.value = initialData.nombre || '';
            correoRef.current.value = initialData.correo_electronico || '';
            telefonoRef.current.value = initialData.telefono || '';
            passwordRef.current.value = initialData.password || '';
            tipoUsuarioRef.current.value = initialData.tipo_usuario || '';
            // Continúa llenando los campos restantes según sea necesario
        }
    }, [mode, initialData]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = {
                identificacion: parseInt(identificacionRef.current.value),
                nombre: nombreRef.current.value,
                correo_electronico: correoRef.current.value,
                telefono: telefonoRef.current.value,
                password: passwordRef.current.value,
                tipo_usuario: tipoUsuarioRef.current.value
            };
            await handleSubmit(formData, e);
        } catch (error) {
            console.error('Error al procesar el formulario:', error);
            // Mostrar un mensaje de error al usuario de manera más descriptiva
        }
    };

    return (
        <>
            <form method='post' onSubmit={handleFormSubmit}>
                <div className='flex flex-col'>
                    {/* Resto del formulario */}
                </div>
                <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                        Close
                    </Button>
                    <Button type='submit' color="primary">
                        {actionLabel}
                    </Button>
                </ModalFooter>
            </form>
        </>
    )
}

export default FormUsuarios;
