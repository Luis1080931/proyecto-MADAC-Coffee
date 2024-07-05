import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const FormularioEmpleado = ({ onSubmit, className, initialData, mode, cerrarModal}) => {
    const initialFormData = {
        id_usuario: initialData && initialData.id_usuario? initialData.id_usuario : '',
        nombre: initialData && initialData.nombre ? initialData.nombre : '',
        apellido: initialData && initialData.apellido ? initialData.apellido : '',
        correo: initialData && initialData.correo ? initialData.correo : '',
        password: initialData && initialData.password ? initialData.password : '',
        rol: initialData && initialData.rol ? initialData.rol : ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [showWarning, setShowWarning] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validarNombres = nombre => {
        const soloLetras = /^[a-zA-Z\s]*$/;
        return soloLetras.test(nombre);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData.nombre || !formData.apellido || !formData.correo || !formData.password || !formData.rol) {
                setShowWarning(true);
                return;
            }
            if (!validarNombres(formData.nombre, formData.apellido)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El nombre o el apellido solo puede contener letras'
                });
                return;
            }
    
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No se encontró el token en el localStorage');
                return;
            }
    
            if (mode === 'registro') {
                const response = await axios.post(
                    'http://10.193.144.95:3000/registrarEmpleado',
                    formData,
                    {
                        headers: {
                            'token': token
                        }
                    }
                );
    
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'El empleado se ha registrado exitosamente'
                });
                onSubmit(formData);
            } else if (mode === 'update') {
                const { id } = initialData;
                await axios.put(
                    `http://10.193.144.95:3000/actualizarEmpleado/${id}`,
                    formData,
                    {
                        headers: {
                            'token': token
                        }
                    }
                );
    
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'El empleado se ha actualizado exitosamente'
                });
    
                const updatedData = { ...formData, id_usuario: id };
                onSubmit(formData);
            }
            cerrarModal();
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.message === 'El correo ya está en uso') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'El correo ya está en uso. Por favor, use un correo diferente.'
                });
            } else {
                console.error('Error al procesar el formulario:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.'
                });
            }
        }
    };
    
      

    return (
        <form
            className={className}
            onSubmit={handleFormSubmit}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
            }}
        >
            {showWarning && (
                <p style={{ color: 'red', marginBottom: '10px' }}>
                    Por favor complete todos los campos
                </p>
            )}
            <div className="flex flex-col">
                <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
                    Nombres:{' '}
                </label>
                <br />
                <input
                    style={{
                        borderColor: '#1bc12e',
                        borderRadius: '6px',
                        width: '50%',
                        height: '40px'
                    }}
                    type="text"
                    name="nombre"
                    placeholder="Nombre del empleado"
                    value={formData.nombre}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col">
                <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
                    Apellidos:{' '}
                </label>
                <br />
                <input
                    style={{
                        borderColor: '#1bc12e',
                        borderRadius: '6px',
                        width: '50%',
                        height: '40px'
                    }}
                    type="text"
                    name="apellido"
                    placeholder="Apellido del empleado"
                    value={formData.apellido}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col">
                <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
                    Correo:{' '}
                </label>
                <br />
                <input
                    style={{
                        borderColor: '#1bc12e',
                        borderRadius: '6px',
                        width: '50%',
                        height: '40px'
                    }}
                    type="text"
                    name="correo"
                    placeholder="correo"
                    value={formData.correo}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col">
                <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
                    Contraseña:{' '}
                </label>
                <br />
                <input
                    style={{
                        borderColor: '#1bc12e',
                        borderRadius: '6px',
                        width: '50%',
                        height: '40px'
                    }}
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            <div className="flex flex-col">
                <label className="text-x1 font-bold w-80" style={{ fontWeight: 'bold' }}>
                    Rol:{' '}
                </label>
                <br />
                <select
                    style={{
                        borderColor: '#1bc12e',
                        borderRadius: '6px',
                        width: '50%',
                        height: '40px'
                    }}
                    name="rol"
                    value={formData.rol}
                    onChange={handleChange}
                >
                    <option value="">Seleccione...</option>
                    <option value="empleado">Empleado</option>
                </select>
            </div>
            <button
                className="boton"
                type="submit"
                style={{
                    backgroundColor: 'green',
                    borderRadius: '10px',
                    color: 'white',
                    border: 'none',
                    marginLeft: '3%',
                    width: '20%',
                    fontSize: '17px',
                    marginTop: '20px',
                    height: '40px'
                }}
            >
                {mode === 'registro' ? 'Registrar' : 'Actualizar'}
            </button>
        </form>
    );
};

export default FormularioEmpleado;
