import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import HeaderInicio from '../organismos/Header/HeaderInicio.jsx';
import InputAtom from '../atomos/Inputs.jsx';
import Botones from '../atomos/Botones.jsx';
import v from '../../styles/variables';
import Logo from '../../assets/logoOrigi.png';

const IniciarSesion = () => {
    const [formData, setFormData] = useState({
        correo: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.correo.trim() === '' || formData.password.trim() === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor, complete todos los campos.',
                confirmButtonText: 'Aceptar'
            });
            return;
        }
    
        try {
            setLoading(true);
            const response = await axios.post('http://10.193.144.95:3000/validacion', formData);
            const responseData = response.data;
    
            if (responseData.message === 'Contraseña incorrecta') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al iniciar sesión',
                    text: 'La contraseña ingresada es incorrecta.',
                    confirmButtonText: 'Aceptar'
                });
                return;
            }
    
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('usuario', JSON.stringify({
                nombre: responseData.nombre,
                apellido: responseData.apellido,
                correo: responseData.correo,
                rol: responseData.rol,
                id_usuario: responseData.id_usuario,
                imagen: responseData.imagen
            }));
    
            Swal.fire({
                icon: 'success',
                title: 'Inicio exitoso',
                text: 'Haz ingresado correctamente',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                if (responseData.rol === "administrador") {
                    navigate('/dashboard');
                } else {
                    navigate('/dashboard2');
                }
            });
    
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error al iniciar sesión',
                text: error.response?.data?.message || 'Error desconocido',
                confirmButtonText: 'Aceptar'
            });
        } finally {
            setLoading(false);
        }
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const formularioStyle = {
        border: '1px solid #ccc',
        borderRadius: '25px',
        padding: '80px',
        marginTop: '150px',
        maxWidth: '480px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    };

    const fondoStyle = {
        backgroundImage: `url(${v.ImgSlider1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: 'calc(100vh - 100px)',
        maxHeight: '100%',
        width: '100%',
        overflowY: 'auto',
        position: 'fixed',
        top: '100px',
        left: 0,
        zIndex: -1,
    };

    const tituloStyle = {
        fontSize: '2.3em',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '1.30rem',
    };

    return (
        <div style={fondoStyle}>
            <div className='flex' style={{ margin: '130px', marginLeft: '700px', marginTop: '-70px' }}>
                <HeaderInicio />
                <div className='flex items-center justify-center'>
                    <form style={{ textAlign: 'center', ...formularioStyle }} onSubmit={handleSubmit}>
                        <label style={tituloStyle}>Inicio de Sesión</label>
                        <img src={Logo} alt="Logo" style={{ maxWidth: '160px' }} />
                        <div style={{ marginTop: '20px' }}>
                            <span style={{ fontSize: '1.1em', fontWeight: 'bold' }}>Ingresa tu correo electrónico: </span>
                            <InputAtom
                                className='mb-3 height-10'
                                type="email"
                                placeholder="Correo Electrónico"
                                name="correo"
                                value={formData.correo}
                                onChange={handleChange}
                            />
                            <span style={{ fontSize: '1.1em', fontWeight: 'bold' }}>Ingresa tu contraseña: </span>
                            <InputAtom
                                type="password"
                                placeholder="Contraseña"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='flex items-center justify-center'>
                            {loading && <span>Cargando...</span>}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '25px', fontSize: '15px' }}>
                            <Link to='/olvidocontra1'>¿Olvidó su contraseña?</Link>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', margin: '15px', marginTop: '60px' }}>
                            <Botones children='Iniciar' type="submit" disabled={loading} />
                            <div>
                                <Link to='/registrarse' style={{ textDecoration: 'none' }}>
                                    <Botones children='Registrarse' />
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default IniciarSesion;
